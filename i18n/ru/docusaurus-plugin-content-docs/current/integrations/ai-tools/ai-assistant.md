---
title: "Интеграция помощника на базе ИИ с использованием вызовов инструментов"
sidebar_label: "Помощник ИИ"
description: "Как интегрировать помощника на базе ИИ с DHTMLX Gantt с использованием серверных вызовов инструментов и выполнения команд на клиенте"
---

# Интеграция помощника на базе ИИ с использованием вызовов инструментов

Этот гид показывает, как подключить чат-помощника к приложению DHTMLX Gantt с использованием вызовов инструментов.

- Бэкенд: обрабатывает вызовы модели, сохраняет состояние беседы и определяет, какие действия можно выполнить.
- Фронтенд: выполняет утверждённые команды и обновляет диаграмму Gantt в браузере.

Полный пример доступен здесь: [Gantt Maker AI Demo](https://github.com/DHTMLX/gantt-maker-ai-demo).

См. раздел «Особенности» в демо для полного списка поддерживаемых возможностей.

Ниже приводятся разделы, сосредоточенные на минимальном паттерне интеграции.

## Требования

- Node.js 20+
- API-ключ OpenAI или любого провайдера, который предоставляет совместимый конечный точек OpenAI Chat Completions с поддержкой вызова инструментов (укажите `OPENAI_BASE_URL` на него)
- Знание Socket.IO, формата вызова инструментов OpenAI Chat Completions и API DHTMLX Gantt

## Как работает интеграция

Каждое сообщение пользователя проходит через следующий процесс:

```text
сообщение пользователя
  -> фронтенд отправляет сообщение на бэкенд
  -> бэкенд вызывает модель с инструментами
  -> модель возвращает вызов инструмента
  -> бэкенд пересылает вызов инструмента на фронтенд
  -> фронтенд выполняет команду Gantt
  -> фронтенд возвращает результат
  -> бэкенд сохраняет результат
  -> бэкенд вызывает модель снова
  -> фронтенд получает ответ помощника
```

## Запуск демо

Демо по адресу [DHTMLX/gantt-maker-ai-demo](https://github.com/DHTMLX/gantt-maker-ai-demo) поставляется с тремя режимами запуска — Docker (производство), Docker (разработка с горячей перезагрузкой) и обычный `npm` — описано в его [README](https://github.com/DHTMLX/gantt-maker-ai-demo#readme). Короткий путь:

```bash
git clone https://github.com/DHTMLX/gantt-maker-ai-demo.git
cd gantt-maker-ai-demo
cp .env.example .env
# отредактируйте .env и укажите OPENAI_API_KEY
docker compose up --build
```

Откройте `http://localhost`. Фронтенд слушает на порту 80, бэкенд — на порту 3001.

Остальная часть данного гайда объясняет интеграционный паттерн. Пути к файлам соответствуют макету демо: `backend/server.ts`, `backend/helper.ts`, `backend/schemaList.ts`, `frontend/src/main.ts`, `frontend/src/chat-widget.ts`, `frontend/src/command-runner.ts`.

## Отправка сообщений пользователя

Фронтенд отправляет сообщения пользователя на бэкенд через Socket.IO. Сообщение содержит только ввод пользователя — дополнительные данные, такие как текущее состояние Gantt, запрашиваются отдельно по мере необходимости (см. ниже раздел [State-aware commands](#state-aware-commands)). В демо чат-виджет, встроенный в элемент `#chat_panel` ([`frontend/src/chat-widget.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/frontend/src/chat-widget.ts)), оборачивает этот вызов.

```ts
function sendUserMessage(message: string): void {
    if (!message) {
        return;
    }

    socket.emit('user_msg', JSON.stringify({ message }));
}
```

## Вызов модели

Бэкенд получает сообщения пользователя, сохраняет их в историю разговора и вызывает модель с доступными инструментами.

Клиент OpenAI читает `OPENAI_API_KEY`, `OPENAI_BASE_URL` и `OPENAI_MODEL` из окружения. Используйте `OPENAI_BASE_URL`, чтобы указать на любой провайдер, который предоставляет API OpenAI Chat Completions. 

```ts
const history = new Map<string, ChatCompletionMessageParam[]>();

function getHistory(socketId: string) {
    if (!history.has(socketId)) {
        history.set(socketId, [
            {
                role: 'system',
                content: `
                    You control a Gantt chart using tools.

                    Rules:
                    - Use tools to perform actions.
                    - Do not describe actions in text if a tool can be used.
                    - Prefer calling tools over explaining.
                `
            }
        ]);
    }

    return history.get(socketId);
}

socket.on('user_msg', async (payload: UserMsgPayload | string) => {
    const { message } = typeof payload === 'string' ? JSON.parse(payload) : payload;

    const history = getHistory(socket.id);

    saveMessage(socket.id, {
        role: 'user',
        content: message,
    });

    const response = await openai.chat.completions.create({
        model: MODEL,
        messages: history,
        tools: schemaList,
        tool_choice: 'auto',
    });

    const assistantMessage = response.choices[0].message;
    // assistantMessage may be a final reply or a request for tool calls.
    // We process it in the Conversation loop section below.
});
```

Системное сообщение сохраняется в истории разговора и добавляется только один раз за сессию.

:::note
Промпт системы демо более развёрнутый ([`backend/server.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/server.ts)): он требует, чтобы модель сначала вызвала `get_gantt_state` при запросе, зависящем от существующих задач, возвращает фиксированное `SKIP_MESSAGE`, если подходящего инструмента нет, и ограничивает финальные ответы 1–2 простыми предложениями.
:::

## Схема инструментов

Бэкенд определяет инструменты, которые может вызывать модель. Каждый инструмент описывает допустимое действие и его параметры. Демо-вспомогательная `backend/schemaList.ts` определяет 27 таких инструментов — CRUD для задач, зависимости, стили, шкалы, планирование, экспорт — но паттерн интеграции одинаковый независимо от объёма. Начинаем с `zoom` как простейшего примера, затем расширяем до `update_tasks` позже для случая с учетом состояния.

```ts
export const schemaList = [
    {
        type: 'function',
        function: {
            name: 'zoom',
            description: 'Change the Gantt zoom level or fit the chart into view.',
            parameters: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    level: {
                        type: 'string',
                        enum: ["hour", "day", "week", "month", "quarter", "year", "fit"],
                    },
                },
                required: ['level'],
            },
        },
    },
];
```

## Пересылка вызовов инструментов

Когда модель возвращает вызов инструмента, бэкенд разбирает его аргументы и пересылает их на фронтенд, затем ждёт результат.

```ts
// Проверяем, что модель вернула JSON-объект в качестве аргументов.
function parseToolArguments(rawArgs: string): Record<string, unknown> {
    const parsed = JSON.parse(rawArgs);

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Tool arguments must be a JSON object');
    }

    return parsed as Record<string, unknown>;
}

// Отправляем вызов инструмента на фронтенд через Socket.IO и ждём ack
// callback. Отклоняем, если результат не поступит в течение тайм-аута.
function requestClientToolExecution(
    socket: Socket,
    payload: ClientToolRequest
): Promise<ClientToolResult> {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error(`Timed out waiting for tool result: ${payload.cmd}`));
        }, 15000);

        socket.emit('tool_call', payload, (result: ClientToolResult | undefined) => {
            clearTimeout(timeout);

            if (!result) {
                reject(new Error(`No tool result received for: ${payload.cmd}`));
                return;
            }
            resolve(result);
        });
    });
}

// разбор вызова инструмента моделью и диспетчеризация его на фронтенд.
async function executeToolCall({
    socket,
    call,
}: {
    socket: Socket;
    call: ChatCompletionMessageToolCall;
}): Promise<ClientToolResult> {
    return requestClientToolExecution(socket, {
        toolCallId: call.id,
        cmd: call.function.name,
        params: parseToolArguments(call.function.arguments),
    });
}
```

:::note
Демо вынесло `TIMEDOUT_SECONDS = 15_000` в [`backend/constants.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/constants.ts) и считает `parseToolArguments` и `requestClientToolExecution` приватными помощниками — экспортируется только `executeToolCall`. 15-секундный предел учитывает сетевые задержки и время отрисовки Gantt; ужесточайте его только если у вас есть уверенность в скорости фронтенда.
:::

## Исполнитель команд

Исполнитель команд определяет, как вызовы инструментов сопоставляются с вызовами API DHTMLX Gantt. Он служит границей между выводом модели и API Gantt.

Должны выполняться только предопределённые команды. Каждое имя backend-инструмента должно соответствовать подходящей frontend-команде, а неизвестные команды должны приводить к неудаче.

```ts
import type { GanttStatic } from '@dhx/trial-gantt';

export default function createCommandRunner(gantt: GanttStatic) {
    return function runCommand(cmd: string, params: Record<string, unknown>): void {
        switch (cmd) {
            case 'zoom':
                if (params.level === 'fit') {
                    gantt.ext.zoomToFit();
                } else {
                    gantt.ext.zoom.setLevel(params.level as string);
                }
                break;

            default:
                throw new Error(`Unsupported command: ${cmd}`);
        }
    };
}
```

Раннер подключается один раз при старте приложения:

```ts
const runCommand = createCommandRunner(gantt);
```

:::note
Ра́ннер демо вместо выброса ошибки в ветке по умолчанию записывает `console.warn("Unknown cmd:", cmd, args)` — это предотвращает проброс ошибки к модели как результат инструмента, что позволяет LLM извиниться или повторить попытку. Предупреждение в тишине продолжает чат, но скрывает расхождение между списками команд бэкенда и фронтенда. Для реального приложения выберите подход, который подходит именно вам.
:::

## Выполнение команд

Фронтенд получает вызовы инструментов, выполняет запрошенную команду и возвращает результат через ack-обработчик Socket.IO. Ack — это сигнал бэкенду о том, что инструмент выполнился; без него общение останавливается до истечения тайм-аута. Успешная команда возвращает текущее состояние диаграммы через `gantt.serialize()`; неудачная команда возвращает ошибку.

```ts
socket.on('tool_call', (payload: ClientToolRequest, ack?: (result: ClientToolResult) => void) => {
    try {
        runCommand(payload.cmd, payload.params);

        ack?.({
            ok: true,
            cmd: payload.cmd,
            data: gantt.serialize(),
        });
    } catch (error) {
        ack?.({
            ok: false,
            cmd: payload.cmd,
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
```

## Цикл диалога

Вызовы инструментов являются частью диалога, а не итоговым ответом помощника. После выполнения команды результат сохраняется в истории разговора и отправляется модели.

Модель может запросить несколько вызовов инструментов подряд: например, обновление, зависящее от состояния, которое разворачивается в `get_gantt_state`, за которым следует `update_tasks`. Бэкенд повторяет цикл выполнения, пока модель не вернёт сообщение без вызовов инструментов — но ограничено `MAX_TURNS`, чтобы сумасшедшая модель не держала цикл открытым бесконечно.

```ts
const MAX_TURNS = 10;

for (let turn = 0; turn < MAX_TURNS; turn++) {
    const response = await openai.chat.completions.create({
        model: MODEL,
        messages: getHistory(socket.id),
        tools: schemaList,
        tool_choice: 'auto',
    });

    const message = response.choices[0].message;

    // Больше нет вызовов инструментов → отправляем финальный ответ и прекращаем.
    if (!message.tool_calls?.length) {
        socket.emit('assistant_msg', message.content ?? '');
        saveMessage(socket.id, { role: 'assistant', content: message.content ?? '' });
        return;
    }

    // Сохраняем шаг помощника, который вызвал вызовы инструментов.
    saveMessage(socket.id, {
        role: 'assistant',
        content: null,
        tool_calls: message.tool_calls,
    });

    // Выполняем каждый вызов инструмента и сохраняем результат обратно в историю.
    for (const call of message.tool_calls) {
        try {
            const result = await executeToolCall({ socket, call });
            saveMessage(socket.id, {
                role: 'tool',
                tool_call_id: call.id,
                content: JSON.stringify(result),
            });
        } catch (err) {
            saveMessage(socket.id, {
                role: 'tool',
                tool_call_id: call.id,
                content: JSON.stringify({ ok: false, error: String(err) }),
            });
        }
    }
}

// Цикл исчерпал себя без финального ответа.
socket.emit('assistant_msg', 'Request required too many steps. Please try a simpler command.');
```

Цикл оборачивает первый вызов модели из предыдущего раздела — этот вызов теперь живёт на `turn === 0`, поэтому выражения "Call the model" и "Conversation loop" описывают одно и то же invocation `openai.chat.completions.create()` с двух сторон.

## Защиты

Производительная интеграция требует несколько защит поверх базового цикла:

- **Ограниченный цикл.** `MAX_TURNS` (выше) ограничивает, сколько вызовов инструмента/ответов может быть инициировано одним сообщением пользователя.
- **Изоляция сессий по каждому клиенту.** Храните историю в `Map<socketId, ChatMessages>`, индексируемом `socket.id`, чтобы одновременные пользователи не видели контекст друг друга. Демонстрационная реализация `sessionMessagesByClient` в [`backend/helper.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/helper.ts) делает это.
- **Idle timeout.** Очищайте историю сессии после периода неактивности (демо использует 30 минут), чтобы ограничить использование памяти и избежать устаревшего состояния при возвращении длинноотключившегося клиента.
- **История для обрезки.** Бюджеты токенов ограничены. Обрезайте по *блокам* — каждое сообщение пользователя и его полный ответ помощника (включая любой цепочку вызовов инструментов и результатов) составляет один блок — так вы никогда не разрезаете цикл вызова инструмента пополам на границе обрезки. Сохраните системное сообщение на индексе 0. Демо-проработка `trimHistory()` в [`backend/helper.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/helper.ts) сохраняет последние `MAX_MESSAGES = 20` блоков.
- **Проверка аргументов инструмента.** Помощник `parseToolArguments` выше просто обеспечивает, что аргументы являются JSON-объектом. Далее валидируйте их по JSON-схеме, которую зарегистрировали с моделью, или допускайте, что раннер поймает некорректные аргументы на границе.

## State-aware команды

Некоторые команды не зависят от текущего состояния диаграммы. Команды, изменяющие существующие задачи, требуют доступа к текущему состоянию Gantt, чтобы модель могла ссылаться на идентификаторы задач и подготавливать обновления.

Инструмент `get_gantt_state` возвращает текущее состояние через `gantt.serialize()` без изменения диаграммы. Затем модель может вызвать `update_tasks`, чтобы применить изменения на основании этого состояния.

```text
Пользователь: Переместить задачу QA на два дня позже
  -> get_gantt_state
  -> результат инструмента (gantt.serialize())
  -> update_tasks
  -> результат инструмента с обновлённым gantt.serialize()
  -> финальный ответ помощника
```

Схема инструментов для чтения текущего состояния:

```ts
{
    type: 'function',
    function: {
        name: 'get_gantt_state',
        description: 'Return the current Gantt tasks and links.',
        parameters: {
            type: 'object',
            additionalProperties: false,
            properties: {},
        },
    },
}
```

Схема инструментов для обновления существующих задач:

```ts
{
    type: 'function',
    function: {
        name: 'update_tasks',
        description: 'Update existing Gantt tasks by id.',
        parameters: {
            type: 'object',
            additionalProperties: false,
            properties: {
                tasks: {
                    type: 'array',
                    items: {
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                            id: { type: ['string', 'number'] },
                            text: { type: 'string' },
                            start_date: { type: 'string', format: 'date' },
                            duration: { type: 'number' },
                            progress: {
                                type: 'number',
                                minimum: 0,
                                maximum: 1,
                            },
                        },
                        required: ['id'],
                    },
                },
            },
            required: ['tasks'],
        },
    },
}
```

Исполнитель frontend-кода по фронтенду:

```ts
case 'get_gantt_state':
    break;

case 'update_tasks':
    gantt.batchUpdate(() => {
        for (const task of params.tasks as Array<Record<string, unknown>>) {
            const taskId = task.id as string | number;

            if (!gantt.isTaskExists(taskId)) {
                throw new Error(`Task does not exist: ${taskId}`);
            }

            const existingTask = gantt.getTask(taskId);
            Object.assign(existingTask, task);
            gantt.updateTask(taskId);
        }
    });
    break;
```

:::note
Данный пример `update_tasks` сделан намеренно минимальным. Раннер демо в [`frontend/src/command-runner.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/frontend/src/command-runner.ts) добавляет производственные детали: он пропускает задачи типа `"project"` (пересчитываются из дочерних), парсит входящие даты через `gantt.templates.parse_date` и вызывает `gantt.calculateEndDate`, чтобы сохранить согласованность между `start_date`, `end_date` и `duration`, когда модель отправляет не все из них. Подумайте об использовании той же логики, чтобы связать этот шаблон с живым графиком.

Gantt принимает как объекты `Date`, так и строки ISO 8601 "из коробки". Для других форматов строк настройте `gantt.config.date_format` и переопределите `gantt.templates.parse_date`.
:::

## Устранение неполадок

- **Бэкенд ждёт результат инструмента до истечения тайм-аута.** Фронтенд не вызывает ack-колбек. Каждый путь обработчика `socket.on('tool_call')` — включая блок catch — должен вызывать `ack()`.

- **Модель возвращает текст вместо вызова инструмента.** Бэкенд не передает `tools` в `chat.completions.create()`, либо `tool_choice` не равен `'auto'`. Мелкие модели (например, `gpt-4.1-nano`) также склонны ошибаться; попробуйте сначала `gpt-5-nano` или `gpt-4.1-mini`.

- **Команда кажется успешной, но диаграмма Gantt не меняется.** Раннер возвращает `{ ok: true }` для неподдерживаемой команды. Сделайте ветку `default` в `switch` неудачной (throw или warn) и убедитесь, что каждое имя backend-инструмента имеет соответствующий случай на frontend.

- **`JSON.parse` падает при чтении аргументов инструмента.** Верните детерминированную ошибку или сохраните `{ ok: false, error }` как результат инструмента, чтобы модель могла восстановиться, а не застрять.

- **Модель обновляет неверную задачу.** Интеграция пропускает шаг чтения состояния (`get_gantt_state`) или валидацию идентификатора задачи на фронтенде. Добавьте правило MUST call get_gantt_state first в системный промпт и проверьте `gantt.isTaskExists()` в раннере.

## Резюме

Интеграция подключает помощника на базе ИИ к DHTMLX Gantt через серверные вызовы инструментов и выполнение команд на клиенте.

Бэкенд обрабатывает вызовы модели, схемы инструментов и историю разговора. Фронтенд выполняет утверждённые команды на экземпляре Gantt и возвращает текущее состояние диаграммы.

Исполнитель команд определяет границу между выводом модели и API Gantt: разрешено изменять диаграмму только явно поддерживаемыми командами.

После каждого вызова инструмента бэкенд сохраняет результат и вызывает модель снова, чтобы итоговый ответ помощника основывался на фактическом результате выполнения.

## Связанные материалы

- [Live Gantt Maker AI Demo](https://dhtmlx.com/docs/demo/ai-gantt-maker/)
- [Gantt Maker AI Demo на GitHub](https://github.com/DHTMLX/gantt-maker-ai-demo) - полный исходник интеграции, описанный здесь
- [Demo README](https://github.com/DHTMLX/gantt-maker-ai-demo#readme) - установка, переменные окружения, режимы Docker и npm run
- [Документация DHTMLX Gantt](https://docs.dhtmlx.com/gantt/)
- [OpenAI API - функция вызова](https://developers.openai.com/api/docs)
- [Документация Socket.IO](https://socket.io/docs/v4/)
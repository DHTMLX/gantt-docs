---
title: "使用工具调用集成 AI 助手"
sidebar_label: "AI 助手"
description: "如何通过后端工具调用和前端命令执行将 AI 助手与 DHTMLX Gantt 集成"
---

# 使用工具调用集成 AI 助手

本指南演示如何通过工具调用将聊天助手连接到 DHTMLX Gantt 应用程序。

- 后端：处理模型调用、存储对话状态，并决定哪些操作可以执行。
- 前端：执行已批准的命令并在浏览器中更新甘特图。

完整示例在这里：[Gantt Maker AI Demo](https://github.com/DHTMLX/gantt-maker-ai-demo)。

请在演示中的 “Features” 部分查看完整的支持能力列表。

以下各节聚焦于最小集成模式。

## 前提条件

- Node.js 20+ → Node.js 20 及以上版本
- 一个 OpenAI API 密钥，或任何暴露兼容 Chat Completions API 且支持 tool calling 的提供者（将 `OPENAI_BASE_URL` 指向它）
- 熟悉 Socket.IO、OpenAI Chat Completions tool-calling 格式，以及 DHTMLX Gantt API

## 集成工作方式

每条用户消息将经过以下流程：

```text
用户消息
  -> 前端 将 消息 发送 到 后端
  -> 后端 使用工具 调用 模型
  -> 模型 返回 一个 工具 调用
  -> 后端 将 工具 调用 转发 给 前端
  -> 前端 执行 Gantt 命令
  -> 前端 返回 结果
  -> 后端 保存 结果
  -> 后端 再次 调用 模型
  -> 前端 收到 助手 响应
```

## 运行演示

在 [DHTMLX/gantt-maker-ai-demo](https://github.com/DHTMLX/gantt-maker-ai-demo) 的演示带有三种运行模式 —— Docker（生产环境）、Docker（开发环境，带热加载），以及纯 `npm` —— 详见其 [README](https://github.com/DHTMLX/gantt-maker-ai-demo#quick-start)。

最简路径：

```bash
git clone https://github.com/DHTMLX/gantt-maker-ai-demo.git
cd gantt-maker-ai-demo
cp .env.example .env
# edit .env and set OPENAI_API_KEY
docker compose up --build
```

打开 http://localhost。前端监听端口 80，后端端口 3001。

本指南的其余部分将通过集成模式进行讲解。文件路径引用演示布局：`backend/server.ts`、`backend/helper.ts`、`backend/schemaList.ts`、`frontend/src/main.ts`、`frontend/src/chat-widget.ts`、`frontend/src/command-runner.ts`。

## 发送用户消息

前端通过 Socket.IO 将用户消息发送到后端。消息仅包含用户输入——需要时才单独请求其他数据，例如当前 Gantt 状态（请参见下文的 State-aware commands）。在演示中，挂载到 `#chat_panel` 的聊天小部件（[`frontend/src/chat-widget.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/frontend/src/chat-widget.ts)）封装了此调用。

```ts
function sendUserMessage(message: string): void {
    if (!message) {
        return;
    }

    socket.emit('user_msg', JSON.stringify({ message }));
}
```

## 调用模型

后端接收用户消息，将其存储到对话历史中，并使用可用的工具调用模型。

OpenAI 客户端从环境变量中读取 `OPENAI_API_KEY`、`OPENAI_BASE_URL` 和 `OPENAI_MODEL`。使用 `OPENAI_BASE_URL` 指向任何暴露 OpenAI Chat Completions API 的提供者。 

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

:::note
演示中的 system prompt 更为详细（见 [`backend/server.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/server.ts)）：它要求模型在需要依赖现有任务的请求上先调用 `get_gantt_state`，在没有匹配到工具时返回固定的 `SKIP_MESSAGE`，并将最终回复限定为 1–2 句纯文本。
:::

## Tool schema

后端定义模型可调用的工具。每个工具描述一个允许的操作及其参数。演示中的 [`backend/schemaList.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/schemaList.ts) 定义了 27 个此类工具 —— 任务增删改、依赖、样式、时间刻度、调度、导出等 —— 但集成模式在数量多少上均保持一致。我们先以 `zoom` 作为最简单的示例，然后在后续为状态感知场景扩展到 `update_tasks`。

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

## 转发工具调用

当模型返回一个工具调用时，后端解析其参数并将其转发到前端，然后等待结果。

```ts
// Validate that the model returned a JSON object as arguments.
function parseToolArguments(rawArgs: string): Record<string, unknown> {
    const parsed = JSON.parse(rawArgs);

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Tool arguments must be a JSON object');
    }

    return parsed as Record<string, unknown>;
}

// Send the tool call to the frontend over Socket.IO and wait for the ack
// callback. Reject if no result arrives within the timeout.
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

// parse the model's tool call and dispatch it to the frontend.
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
演示中将 `TIMEDOUT_SECONDS = 15_000` 提取到 [`backend/constants.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/constants.ts)，并将 `parseToolArguments` 与 `requestClientToolExecution` 视为私有辅助函数——只有 `executeToolCall` 被导出。15 秒的上限覆盖网络与 Gantt 渲染所需时间；若你对前端有更快的保证，可以缩短该时间。
:::

## 命令执行器

命令执行器定义了工具调用如何映射到 DHTMLX Gantt 的 API 调用。它充当模型输出与 Gantt API 之间的边界。

只应执行预先定义的命令。每个后端工具名称都必须有一个前端命令匹配，未知命令必须自我关闭失败。

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

运行时在启动时初始化一次：

```ts
const runCommand = createCommandRunner(gantt);
```

:::note
演示中的执行器在默认分支上会记录 `console.warn("Unknown cmd:", cmd, args)` 而不是抛出异常。抛出会把错误暴露给模型，作为工具结果让大语言模型道歉或重试。静默警告则保持对话继续进行，但隐藏后端与前端命令列表之间的偏差。若用于真实应用，请选择适合你的方案。
:::

## 执行命令

前端接收工具调用，执行请求的命令，并通过 Socket.IO 的 ack 回调返回结果。ack 表示后端已执行该工具——没有它，对话将因超时而停滞。成功的命令会返回当前图表状态，使用 `gantt.serialize()`；失败的命令会返回错误信息。

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

## 对话循环

工具调用是对话的一部分，而不是最终的助手回复。执行命令后，结果被存储到对话历史并返回给模型。

模型可能会顺序请求多次工具调用：例如一个状态感知的更新，会分解为 `get_gantt_state`，随后再执行 `update_tasks`。后端会重复执行循环，直到模型返回不再包含工具调用的消息——但受 `MAX_TURNS` 限制，以防止模型异常地长时间保持循环。

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

    // No more tool calls → emit the final reply and stop.
    if (!message.tool_calls?.length) {
        socket.emit('assistant_msg', message.content ?? '');
        saveMessage(socket.id, { role: 'assistant', content: message.content ?? '' });
        return;
    }

    // Persist the assistant turn that triggered the tool calls.
    saveMessage(socket.id, {
        role: 'assistant',
        content: null,
        tool_calls: message.tool_calls,
    });

    // Run each tool call and persist the result back into history.
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

// 循环在没有最终回复的情况下耗尽。
// 向前端发送最终消息，提示请求需要的步骤太多。
socket.emit('assistant_msg', 'Request required too many steps. Please try a simpler command.');
```

这段循环也包含了前一节中对第一条模型调用的包装——该调用现在落在 `turn === 0`，因此“调用模型”和“对话循环”从两个角度描述同一个 `openai.chat.completions.create()` 调用。

## 防护措施

生产集成需要在基本循环之上额外加入若干防护：

- **有界循环。** 上文的 `MAX_TURNS` 上限限制单次用户消息可以触发的工具/响应循环数量。
- **按客户端会话隔离。** 将历史记录放在一个以 `socket.id` 为键的 `Map<socketId, ChatMessages>` 中，确保并发用户互不看到对方的上下文。演示中的 [`sessionMessagesByClient`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/helper.ts) 就是这样实现的。
- **空闲超时。** 在一段时间不活动后丢弃会话历史，以界定内存并避免长时间断线后状态变得陈旧（演示中为 30 分钟）。
- **历史记录裁剪。** Token 预算是有限的。按块裁剪——每条用户消息及其完整的助手回复（包括工具调用/工具结果链）算作一个块——因此不会在裁剪边界拆分工具调用循环。将系统消息固定在索引 0。演示中的 [`trimHistory()`] 在 [`backend/helper.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/helper.ts) 中保留最近的 `MAX_MESSAGES = 20` 块。
- **工具参数校验。** 上述的 `parseToolArguments` 辅助函数仅强制“是一个 JSON 对象”。除此之外，可以对你向模型注册的 JSON 架构进行校验，或接受运行器在边界处捕获格式错误的参数。

## 状态感知命令

某些命令与当前图表状态无关（例如 `zoom`）。修改现有任务的命令需要访问当前的 Gantt 状态，以便模型引用任务 ID 并准备更新。

`get_gantt_state` 工具返回当前 `gantt.serialize()` 的结果，而不修改图表。模型随后可以调用 `update_tasks` 根据此状态应用更改。

```text
User: Move the QA task two days later
  -> get_gantt_state
  -> tool result (gantt.serialize())
  -> update_tasks
  -> tool result with updated gantt.serialize()
  -> final assistant reply
```

用于读取当前状态的工具模式：

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

用于更新现有任务的工具模式：

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

前端的命令执行器处理如下分支：

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
此处的 `update_tasks` 示例故意保持简洁。演示中的前端运行器在 [`frontend/src/command-runner.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/frontend/src/command-runner.ts) 中增加了生产环境所需的要点：跳过类型为 `"project"` 的任务（从子任务重新计算得出），使用 `gantt.templates.parse_date` 解析输入日期，并在模型仅发送部分字段时调用 `gantt.calculateEndDate` 以保持 `start_date`、`end_date` 和 `duration` 的一致性。连接此模式到实际图表时，请借鉴该逻辑。

Gantt 原生支持 `Date` 对象和 ISO 8601 字符串。若要使用其他字符串格式，请配置 `gantt.config.date_format` 并覆盖 `gantt.templates.parse_date`。
:::note

## 故障排除

- **后端在超时前等待工具结果。** 前端并未调用 ack 回调。`socket.on('tool_call')` 的每一个分支——包括捕获分支——都必须调用 `ack()`。

- **模型返回文本而非工具调用。** 后端未向 `chat.completions.create()` 传入 `tools`，或 `tool_choice` 不是 `'auto'`。较小的模型（例如 `gpt-4.1-nano`）也容易偏离；先尝试 `gpt-5-nano` 或 `gpt-4.1-mini`。

- **一个命令看似成功但 Gantt 图未变化。** 运行器对不受支持的命令返回 `{ ok: true }`。让默认分支失败（抛出或警告），并确保每个后端工具名称都在前端有匹配的分支。

- **读取工具参数时 `JSON.parse` 失败。** 返回确定性错误，或将 `{ ok: false, error }` 作为工具结果存储，以便模型能够在边界处恢复，而不是停滞。

- **模型更新了错误的任务。** 集成缺少一个 state-reading 步骤（`get_gantt_state`）或前端的任务 ID 验证。请在系统提示中加入 “ MUST call get_gantt_state first ” 规则，并在运行器中检查 `gantt.isTaskExists()`。

## 小结

该集成通过后端工具调用和前端命令执行，将 AI 助手连接到 DHTMLX Gantt。

后端处理模型调用、工具模式以及对话历史。前端在 Gantt 实例上执行已批准的命令并返回当前的图表状态。

命令执行器定义了模型输出与 Gantt API 之间的边界：只有明确支持的命令才可以修改图表。

在每次工具调用后，后端保存结果并再次调用模型，使最终的助手回复基于实际执行结果。

## 相关材料

- [Live Gantt Maker AI Demo](https://dhtmlx.com/docs/demo/ai-gantt-maker/) 
- [Gantt Maker AI Demo on GitHub](https://github.com/DHTMLX/gantt-maker-ai-demo) - full source for the integration described here
- [Demo README](https://github.com/DHTMLX/gantt-maker-ai-demo#readme) - setup, env vars, Docker and npm run modes
- [DHTMLX Gantt documentation](https://docs.dhtmlx.com/gantt/)
- [OpenAI API - function calling](https://developers.openai.com/api/docs)
- [Socket.IO documentation](https://socket.io/docs/v4/)
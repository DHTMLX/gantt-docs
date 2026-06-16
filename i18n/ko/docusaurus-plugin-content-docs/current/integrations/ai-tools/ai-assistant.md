---
title: "도구 호출을 이용한 AI 어시스턴트 통합"
sidebar_label: "AI 어시스턴트"
description: "백엔드 도구 호출과 프런트엔드 명령 실행을 사용하여 DHTMLX Gantt와 AI 어시스턴트를 통합하는 방법"
---

# 도구 호출을 이용한 AI 어시스턴트 통합

이 가이드는 도구 호출을 사용하여 대화형 어시스턴트를 DHTMLX Gantt 애플리케이션에 연결하는 방법을 보여줍니다.

- 백엔드: 모델 호출을 처리하고, 대화 상태를 저장하며, 실행 가능한 작업을 결정합니다.
- 프런트엔드: 승인된 명령을 실행하고 브라우저의 Gantt 차트를 업데이트합니다.

전체 예제는 여기에서 확인할 수 있습니다: [Gantt Maker AI Demo](https://github.com/DHTMLX/gantt-maker-ai-demo).

지원되는 기능의 전체 목록은 데모의 'Features' 섹션을 참조하십시오.

다음 섹션은 최소 통합 패턴에 초점을 맞춥니다.

## 사전 요구 사항

- Node.js 20+ 이상
- 호환 가능한 OpenAI API 키 또는 도구 호출과 함께 노출되는 Chat Completions 엔드포인트를 제공하는 공급자(환경 변수 `OPENAI_BASE_URL`을 해당 엔드포인트로 가리키도록 설정)
- Socket.IO, OpenAI Chat Completions tool-calling 포맷, 및 DHTMLX Gantt API에 익숙함

## 통합 작동 방식

각 사용자 메시지는 다음 흐름을 거칩니다:

```text
user message
  -> frontend sends the message to the backend
  -> backend calls the model with tools
  -> model returns a tool call
  -> backend forwards the tool call to the frontend
  -> frontend executes the Gantt command
  -> frontend returns the result
  -> backend saves the result
  -> backend calls the model again
  -> frontend receives the assistant response
```

## 데모 실행

데모는 [DHTMLX/gantt-maker-ai-demo](https://github.com/DHTMLX/gantt-maker-ai-demo)에 세 가지 실행 모드(Docker(생산), Docker(dev 핫 리로드), 일반 npm 포함)를 제공합니다. 자세한 내용은 해당 데모의 [README](https://github.com/DHTMLX/gantt-maker-ai-demo#quick-start)에서 확인하십시오. 가장 짧은 경로는 다음과 같습니다:

```bash
git clone https://github.com/DHTMLX/gantt-maker-ai-demo.git
cd gantt-maker-ai-demo
cp .env.example .env
# .env를 열고 OPENAI_API_KEY를 설정하세요
docker compose up --build
```

`http://localhost`를 열면 프런트엔드는 포트 80을, 백엔드는 포트 3001을 listens합니다.

이 가이드의 나머지 부분은 통합 패턴을 따라갑니다. 파일 경로는 데모 레이아웃을 참조합니다: `backend/server.ts`, `backend/helper.ts`, `backend/schemaList.ts`, `frontend/src/main.ts`, `frontend/src/chat-widget.ts`, `frontend/src/command-runner.ts`.

## 사용자 메시지 전송

프런트엔드는 Socket.IO를 통해 백엔드로 사용자 메시지를 보냅니다. 메시지는 사용자 입력만 포함하며, 현재 Gantt 상태와 같은 추가 데이터는 필요할 때 별도로 요청됩니다(아래의 [상태 인지 명령](#state-aware-commands) 참조). 데모에서 채팅 위젯은 `#chat_panel`에 마운트되어 있습니다([`frontend/src/chat-widget.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/frontend/src/chat-widget.ts)).

```ts
function sendUserMessage(message: string): void {
    if (!message) {
        return;
    }

    socket.emit('user_msg', JSON.stringify({ message }));
}
```

## 모델 호출

백엔드는 사용자 메시지를 수신하고 대화 기록에 저장한 뒤, 사용 가능한 도구와 함께 모델을 호출합니다.

OpenAI 클라이언트는 환경에서 `OPENAI_API_KEY`, `OPENAI_BASE_URL`, 및 `OPENAI_MODEL`를 읽습니다. `OPENAI_BASE_URL`을 사용하여 OpenAI Chat Completions API를 노출하는 공급처를 가리키십시오.

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

시스템 메시지는 대화 이력에 저장되며 세션당 한 번만 추가됩니다.

:::note
데모의 시스템 프롬프트는 더 자세합니다 ([`backend/server.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/server.ts)): 요청이 기존 작업에 의존하는 경우 먼저 `get_gantt_state`를 호출하도록 모델에 요구하고, 도구 매칭이 없으면 고정된 `SKIP_MESSAGE`를 반환하며, 최종 응답은 1–2개의 일반 텍스트 문장으로 제한합니다.
:::

## 도구 스키마

백엔드는 모델이 호출할 수 있는 도구를 정의합니다. 각 도구는 허용된 작업과 그 매개변수를 설명합니다. 데모의 [`backend/schemaList.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/schemaList.ts)는 27개의 도구를 정의합니다 - 작업 CRUD, 의존성, 스타일링, 축, 일정, 내보내기 등 - 그러나 통합 패턴은 규모에 관계없이 동일합니다. 가장 간단한 예로 `zoom`을 시작으로, 상태 인지 케이스를 위해 나중에 `update_tasks`로 확장합니다.

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

## 도구 호출 전달

모델이 도구 호출을 반환하면, 백엔드는 그 인수를 파싱하고 이를 프런트엔드로 전달한 뒤 결과를 기다립니다.

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
데모는 `TIMEDOUT_SECONDS = 15_000`을 [`backend/constants.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/constants.ts)로 분리하고, `parseToolArguments`와 `requestClientToolExecution`을 비공개 도우미로 취급합니다 - 오직 `executeToolCall`만이 내보내져 사용됩니다. 15초의 상한은 네트워크 및 Gantt 렌더링 시간을 포괄합니다. 프런트엔드에 더 빠른 보장을 얻은 경우에만 이 값을 조정하십시오.
:::

## 커맨드 러너

커맨드 러너는 도구 호출이 DHTMLX Gantt API 호출에 어떻게 매핑되는지 정의합니다. 이는 모델 출력과 Gantt API 사이의 경계 역할을 합니다.

사전에 정의된 명령만 실행되어야 합니다. 모든 백엔드 도구 이름은 매칭되는 프런트엔드 명령어를 가져야 하며, 알 수 없는 명령은 닫힌 실패로 처리되어야 합니다.

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

런너는 시작 시 한 번 연결됩니다:

```ts
const runCommand = createCommandRunner(gantt);
```

:::note
데모의 런너는 기본 분기에서 예외를 던지는 대신 `console.warn("Unknown cmd:", cmd, args)`를 로그에 남깁니다. 예외를 던지면 모델 쪽으로 도구 결과를 다시 전달하지만, 경고를 사용하면 채팅 흐름은 원활하게 유지되지만 백엔드와 프런트엔드의 명령 목록 간의 차이가 드리웁니다. 실제 애플리케이션에서는 당신에게 맞는 방식을 선택하십시오.
:::

## 명령 실행

프런트엔드는 도구 호출을 받아 요청된 명령을 실행하고 Socket.IO의 ack 콜백을 통해 결과를 백엔드에 전달합니다. ack는 백엔드에 도구가 실행되었다는 신호이며, 이를 받지 못하면 대화는 타임아웃까지 멈춰 버립니다. 성공한 명령은 `gantt.serialize()`으로 현재 차트 상태를 반환하고, 실패한 명령은 오류를 반환합니다.

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

## 대화 루프

도구 호출은 최종 어시스턴트 응답의 일부가 아니라 대화의 일부입니다. 명령이 실행된 후 그 결과를 대화 이력에 저장하고 모델에 다시 보냅니다.

모델은 연속으로 여러 도구 호출을 요청할 수 있습니다. 예를 들어 상태를 인지하는 업데이트가 `get_gantt_state`로 나뉘어 실행된 뒤 `update_tasks`로 이어질 수 있습니다. 백엔드는 모델이 도구 호출이 없는 메시지를 반환할 때까지 실행 사이클을 반복합니다. 그러나 `MAX_TURNS`로 제한되어 있어 오작동하는 모델이 무한 루프를 만들 수 없습니다.

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

    // 더 이상 도구 호출이 없으면 → 최종 답변을 내보내고 중지합니다.
    if (!message.tool_calls?.length) {
        socket.emit('assistant_msg', message.content ?? '');
        saveMessage(socket.id, { role: 'assistant', content: message.content ?? '' });
        return;
    }

    // 도구 호출을 트리거한 어시스턴트 턴을 보존합니다.
    saveMessage(socket.id, {
        role: 'assistant',
        content: null,
        tool_calls: message.tool_calls,
    });

    // 각 도구 호출을 실행하고 그 결과를 이력에 저장합니다.
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

// 루프가 최종 응답 없이 다 소비되었을 때
socket.emit('assistant_msg', '요청이 너무 많은 단계로 확장되었습니다. 더 간단한 명령을 시도해 주세요.');
```

이 루프는 이전 섹션의 첫 모델 호출을 감싸며, 해당 호출은 이제 `turn === 0`에 존재하므로 “Call the model”과 “Conversation loop”가 같은 `openai.chat.completions.create()` 호출을 서로 다른 관점에서 설명합니다.

## 안전장치

생산용 통합에는 기본 루프 위에 몇 가지 방어막이 필요합니다:

- **루프의 유한성.** 상수 `MAX_TURNS`가 단일 사용자 메시지가 트리거할 수 있는 도구/응답 사이클 수를 제한합니다.
- **클라이언트별 세션 격리.** `socket.id`로 키가 된 `Map<socketId, ChatMessages>`에 이력을 저장합니다. 이렇게 하면 동시다발적인 사용자가 서로의 컨텍스트를 보지 않습니다. 데모의 `sessionMessagesByClient`가 [`backend/helper.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/helper.ts)에 해당합니다.
- **유휴 타임아웃.** 비활동 기간이 지나면 세션 이력을 삭제하여 메모리를 제한하고 오랜 시간 연결이 끊어진 클라이언트가 돌아올 때 상태가 오래되지 않도록 합니다.
- **대화 이력 자르기.** 토큰 예산은 한정되어 있습니다. *블록* 단위로 자릅니다 - 각 사용자 메시지와 전체 어시스턴트 응답(도구 호출/도구 결과 체인 포함)이 하나의 블록이므로 도구 호출 주기를 자르기 경계에서 절단하지 않습니다. 시스템 메시지는 인덱스 0에 고정된 상태로 남겨둡니다. 데모의 `trimHistory()`는 [`backend/helper.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/helper.ts)가 관리하며, 마지막 `MAX_MESSAGES = 20` 블록을 유지합니다.
- **도구 인수 검증.** 위의 `parseToolArguments` 도우미는 "JSON 객체인지"를 강제하는 것 외에는 더 검증하지 않으며, 필요 시 모델과 등록된 JSON 스키마를 통해 추가 검증을 하거나, runner가 경계에서 잘못된 인수를 포착하도록 하십시오.

## 상태 인지 명령

일부 명령은 현재 차트 상태에 의존하지 않습니다(예: `zoom`). 기존 작업을 수정하는 명령은 모델이 작업 ID를 참조하고 업데이트를 준비할 수 있도록 현재 Gantt 상태에 접근해야 합니다.

`get_gantt_state` 도구는 차트를 수정하지 않고 현재 `gantt.serialize()`의 결과를 반환합니다. 그런 다음 모델은 이 상태를 바탕으로 변경을 적용하기 위해 `update_tasks`를 호출할 수 있습니다.

```text
User: Move the QA task two days later
  -> get_gantt_state
  -> tool result (gantt.serialize())
  -> update_tasks
  -> tool result with updated gantt.serialize()
  -> final assistant reply
```

현재 상태를 읽는 도구에 대한 도구 스키마:

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

기존 작업을 업데이트하는 도구 스키마:

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

프런트엔드에서의 커맨드 러너 케이스:

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
이 `update_tasks` 예시는 의도적으로 최소한의 형태로 구성되었습니다. 데모의 러너는 [`frontend/src/command-runner.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/frontend/src/command-runner.ts)에 생산적 필수 로직을 추가합니다: 타입이 `"project"`인 작업은 자식 노드에서 재계산되므로 건너뛰고, 들어오는 날짜를 `gantt.templates.parse_date`로 파싱하며, 모델이 일부만 보낼 때도 `start_date`, `end_date`, 및 `duration` 간의 일관성을 유지하기 위해 `gantt.calculateEndDate`를 호출합니다. 라이브 차트에 이 패턴을 연결할 때는 해당 로직을 적용해 보세요.

Gantt는 기본적으로 Date 객체와 ISO 8601 문자열 둘 다를 지원합니다. 다른 문자열 형식의 경우, `gantt.config.date_format`를 구성하고 `gantt.templates.parse_date`를 재정의하십시오.
:::

## 문제 해결

- **백엔드가 타임아웃까지 도구 결과를 기다립니다.** 프런트엔드가 ack 콜백을 호출하지 않거나, `socket.on('tool_call')` 핸들러의 모든 분기(예: catch)에서 `ack()`를 호출해야 합니다.
- **모델이 도구 호출이 아닌 텍스트를 반환합니다.** 백엔드가 `chat.completions.create()`에 `tools`를 전달하지 않거나 `tool_choice`가 `'auto'`가 아닙니다. 더 작은 모델들(예: `gpt-4.1-nano`)은 흔히 드리므로 먼저 `gpt-5-nano` 또는 `gpt-4.1-mini`를 시도해 보십시오.
- **명령이 성공적으로 보이나 Gantt 차트가 변경되지 않습니다.** 러너가 지원되지 않는 명령에 대해 `{ ok: true }`를 반환하고 있습니다. 기본 `switch` 분기를 실패(close)로 만들고(예외를 던지거나 경고), 백엔드 도구 이름마다 매칭되는 프런트엔드 케이스가 있는지 확인하십시오.
- **`JSON.parse`가 도구 인수를 읽는 동안 실패합니다.** deterministic한 오류를 반환하거나 도구 결과로 `{ ok: false, error }`를 저장해 모델이 복구하도록 하십시오.
- **모델이 잘못된 작업을 업데이트합니다.** 상태 읽기 단계(`get_gantt_state`)가 프런트엔드에 없거나 작업-id 유효성 검사가 누락되었습니다. 시스템 프롬프트에 `MUST call get_gantt_state first` 규칙을 추가하고 러너에서 `gantt.isTaskExists()`를 확인하십시오.

## 요약

이 통합은 백엔드 도구 호출과 프런트엔드 명령 실행을 통해 AI 어시스턴트를 DHTMLX Gantt에 연결합니다.

백엔드는 모델 호출, 도구 스키마, 대화 이력을 처리합니다. 프런트엔드는 승인된 명령을 Gantt 인스턴스에서 실행하고 현재 차트 상태를 반환합니다.

커맨드 러너는 모델 출력과 Gantt API 간의 경계를 정의합니다: 명시적으로 지원된 명령만 차트를 수정할 수 있습니다.

각 도구 호출 후 백엔드는 결과를 저장하고 모델을 다시 호출하여 최종 어시스턴트 응답이 실제 실행 결과를 바탕으로 작성되도록 합니다.

## 관련 자료

- [Live Gantt Maker AI Demo](https://dhtmlx.com/docs/demo/ai-gantt-maker/)
- [Gantt Maker AI Demo on GitHub](https://github.com/DHTMLX/gantt-maker-ai-demo)
- [Demo README](https://github.com/DHTMLX/gantt-maker-ai-demo#readme) - 설정, 환경 변수, Docker 및 npm 실행 모드
- [DHTMLX Gantt documentation](https://docs.dhtmlx.com/gantt/)
- [OpenAI API - function calling](https://developers.openai.com/api/docs)
- [Socket.IO documentation](https://socket.io/docs/v4/)
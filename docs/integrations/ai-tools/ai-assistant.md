---
title: "Integrate an AI Assistant Using Tool Calls"
sidebar_label: "AI Assistant"
description: "How to integrate an AI assistant with DHTMLX Gantt using backend tool calls and frontend command execution"
---

# Integrate an AI Assistant Using Tool Calls

This guide shows how to connect a chat assistant to a DHTMLX Gantt application using tool calls.

- Backend: handles model calls, stores conversation state, and decides which actions can be executed.
- Frontend: executes approved commands and updates the Gantt chart in the browser.

A full example is available here: [Gantt Maker AI Demo](https://github.com/DHTMLX/gantt-maker-ai-demo).

See the "Features" section in the demo for a complete list of supported capabilities.

The following sections focus on the minimal integration pattern.

## Prerequisites

- Node.js 20+
- An OpenAI API key, or any provider that exposes a compatible Chat Completions endpoint with tool calling (point `OPENAI_BASE_URL` at it)
- Familiarity with Socket.IO, the OpenAI Chat Completions tool-calling format, and the DHTMLX Gantt API

## How the integration works

Each user message goes through this flow:

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

## Run the demo

The demo at [DHTMLX/gantt-maker-ai-demo](https://github.com/DHTMLX/gantt-maker-ai-demo) ships with three run modes - Docker (production), Docker (dev with hot reload), and plain `npm` - covered in its [README](https://github.com/DHTMLX/gantt-maker-ai-demo#quick-start). The shortest path:

```bash
git clone https://github.com/DHTMLX/gantt-maker-ai-demo.git
cd gantt-maker-ai-demo
cp .env.example .env
# edit .env and set OPENAI_API_KEY
docker compose up --build
```

Open `http://localhost`. The frontend listens on port 80, the backend on port 3001.

The rest of this guide walks through the integration pattern. File paths reference the demo layout: `backend/server.ts`, `backend/helper.ts`, `backend/schemaList.ts`, `frontend/src/main.ts`, `frontend/src/chat-widget.ts`, `frontend/src/command-runner.ts`.

## Sending user messages

The frontend sends user messages to the backend over Socket.IO. The message contains only the user input - additional data such as the current Gantt state is requested separately when needed (see [State-aware commands](#state-aware-commands) below). In the demo, the chat widget mounted into `#chat_panel` ([`frontend/src/chat-widget.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/frontend/src/chat-widget.ts)) wraps this call.

```ts
function sendUserMessage(message: string): void {
    if (!message) {
        return;
    }

    socket.emit('user_msg', JSON.stringify({ message }));
}
```

## Call the model

The backend receives user messages, stores them in the conversation history, and calls the model with the available tools.

The OpenAI client reads `OPENAI_API_KEY`, `OPENAI_BASE_URL`, and `OPENAI_MODEL` from the environment. Use `OPENAI_BASE_URL` to point at any provider that exposes the OpenAI Chat Completions API. 

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

The system message is stored in the conversation history and added only once per session.

:::note
The demo's system prompt is more elaborate ([`backend/server.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/server.ts)): it requires the model to call `get_gantt_state` first when a request depends on existing tasks, returns a fixed `SKIP_MESSAGE` when no tool matches, and constrains final replies to 1–2 plain-text sentences.
:::

## Tool schema

The backend defines tools that the model can call. Each tool describes an allowed action and its parameters. The demo's [`backend/schemaList.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/schemaList.ts) defines 27 such tools - task CRUD, dependencies, styling, scales, scheduling, exports - but the integration pattern is the same regardless of size. We start with `zoom` as the simplest example, then extend to `update_tasks` later for the state-aware case.

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

## Forward tool calls

When the model returns a tool call, the backend parses its arguments and forwards them to the frontend, then waits for the result.

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
The demo extracts `TIMEDOUT_SECONDS = 15_000` into [`backend/constants.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/constants.ts) and treats `parseToolArguments` and `requestClientToolExecution` as private helpers - only `executeToolCall` is exported. The 15-second cap covers network and Gantt render time; tighten it only if you have a faster guarantee on the frontend.
:::

## Command runner

The command runner defines how tool calls map to DHTMLX Gantt API calls. It acts as the boundary between model output and the Gantt API.

Only predefined commands should be executed. Every backend tool name must have a matching frontend command, and unknown commands must fail closed.


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

The runner is wired up once at startup:

```ts
const runCommand = createCommandRunner(gantt);
```

:::note
The demo's runner logs `console.warn("Unknown cmd:", cmd, args)` instead of throwing on the default branch. Throwing surfaces the error all the way back to the model as a tool result, which lets the LLM apologize or retry. Warning silently keeps the chat moving but hides drift between backend and frontend command lists. For real app pick the approach that works for you.
:::

## Execute commands

The frontend receives tool calls, executes the requested command, and returns the result through the Socket.IO ack callback. The ack is what signals the backend that the tool ran - without it, the conversation stalls until the timeout. A successful command returns the current chart state with `gantt.serialize()`; a failed command returns an error.

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

## Conversation loop

Tool calls are part of the conversation, not the final assistant response. After a command is executed, the result is stored in the conversation history and sent back to the model.

The model may request multiple tool calls in sequence: a state-aware update, for example, fans out into `get_gantt_state` followed by `update_tasks`. The backend repeats the execution cycle until the model returns a message without tool calls - but bounded by `MAX_TURNS` so a misbehaving model can't keep the loop alive forever.

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

// Loop exhausted without a final reply.
socket.emit('assistant_msg', 'Request required too many steps. Please try a simpler command.');
```

The loop wraps the first model call from the previous section as well - that call now lives at `turn === 0`, so "Call the model" and "Conversation loop" describe the same `openai.chat.completions.create()` invocation from two angles.

## Safeguards

A production integration needs a few guardrails on top of the basic loop:

- **Bounded loop.** `MAX_TURNS` (above) caps how many tool/response cycles a single user message can trigger.
- **Per-client session isolation.** Keep history in a `Map<socketId, ChatMessages>` keyed by `socket.id` so concurrent users never see each other's context. The demo's `sessionMessagesByClient` in [`backend/helper.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/helper.ts) does this.
- **Idle timeout.** Drop session history after a period of inactivity (the demo uses 30 minutes) to bound memory and avoid stale state when a long-disconnected client returns.
- **History trimming.** Token budgets are finite. Trim by *blocks* - each user message and its full assistant reply (including any tool-call/tool-result chain) is one block - so you never split a tool-call cycle across the trim boundary. Keep the system message pinned to index 0. The demo's `trimHistory()` in [`backend/helper.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/helper.ts) keeps the last `MAX_MESSAGES = 20` blocks.
- **Tool argument validation.** The `parseToolArguments` helper above only enforces "is a JSON object". Beyond that, validate against the JSON schema you registered with the model, or accept that the runner will catch malformed args at the boundary.

## State-aware commands

Some commands do not depend on the current chart state (for example, `zoom`). Commands that modify existing tasks require access to the current Gantt state so the model can reference task ids and prepare updates.

The `get_gantt_state` tool returns the current result of `gantt.serialize()` without modifying the chart. The model can then call `update_tasks` to apply changes based on this state.

```text
User: Move the QA task two days later
  -> get_gantt_state
  -> tool result (gantt.serialize())
  -> update_tasks
  -> tool result with updated gantt.serialize()
  -> final assistant reply
```

Tool schema for reading the current state:

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

Tool schema for updating existing tasks:

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

The command runner cases on the frontend:

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
This `update_tasks` example is intentionally minimal. The demo's runner in [`frontend/src/command-runner.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/frontend/src/command-runner.ts) adds production essentials: it skips tasks of type `"project"` (recomputed from children), parses incoming dates with `gantt.templates.parse_date`, and calls `gantt.calculateEndDate` to keep `start_date`, `end_date`, and `duration` consistent when the model sends only some of them. Borrow that logic when you connect this pattern to a live chart.

Gantt accepts both `Date` objects and ISO 8601 strings out of the box. For other string formats, configure `gantt.config.date_format` and override `gantt.templates.parse_date`.
:::

## Troubleshooting

**The backend waits for a tool result until timeout.** The frontend isn't calling the ack callback. Every branch of the `socket.on('tool_call')` handler - including the catch - must call `ack()`.

**The model returns text instead of a tool call.** The backend isn't passing `tools` to `chat.completions.create()`, or `tool_choice` isn't `'auto'`. Smaller models (e.g. `gpt-4.1-nano`) also tend to drift; try `gpt-5-nano` or `gpt-4.1-mini` first.

**A command appears successful but the Gantt chart doesn't change.** The runner is returning `{ ok: true }` for an unsupported command. Make the default `switch` branch fail closed (throw or warn) and confirm every backend tool name has a matching frontend case.

**`JSON.parse` fails while reading tool arguments.** Return a deterministic error or store `{ ok: false, error }` as the tool result so the model can recover instead of stalling.

**The model updates the wrong task.** The integration is missing a state-reading step (`get_gantt_state`) or task-id validation on the frontend. Add the `MUST call get_gantt_state first` rule to the system prompt and check `gantt.isTaskExists()` in the runner.

## Summary

The integration connects an AI assistant to DHTMLX Gantt through backend tool calls and frontend command execution.

The backend handles model calls, tool schemas, and conversation history. The frontend executes approved commands on the Gantt instance and returns the current chart state.

The command runner defines the boundary between model output and the Gantt API: only explicitly supported commands can modify the chart.

After each tool call, the backend stores the result and calls the model again so the final assistant response is based on the actual execution result.

## Related Materials

- [Live Gantt Maker AI Demo](https://dhtmlx.com/docs/demo/ai-gantt-maker/)
- [Gantt Maker AI Demo on GitHub](https://github.com/DHTMLX/gantt-maker-ai-demo) - full source for the integration described here
- [Demo README](https://github.com/DHTMLX/gantt-maker-ai-demo#readme) - setup, env vars, Docker and npm run modes
- [DHTMLX Gantt documentation](https://docs.dhtmlx.com/gantt/)
- [OpenAI API - function calling](https://developers.openai.com/api/docs)
- [Socket.IO documentation](https://socket.io/docs/v4/)

---
title: "Integrate an AI Assistant Using Tool Calls"
sidebar_label: "AI Assistant"
description: "How to integrate an AI assistant with DHTMLX Gantt using backend tool calls and frontend command execution"
---

# Integrate an AI Assistant Using Tool Calls

This guide shows how to connect a chat assistant to a DHTMLX Gantt application using tool calls.

- Backend: handles model calls, stores conversation state, and decides which actions can be executed.
- Frontend: executes approved commands and updates the Gantt chart in the browser.

A full example is available here: [Gantt Maker AI Demo](https://github.com/DHTMLX/gantt-maker-ai-demo)

See the "Features" section in the demo for a complete list of supported capabilities.

The following sections focus on the minimal integration pattern.

## How the integration works

The assistant flow:

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

## Sending user messages

The frontend sends user messages to the backend. The message contains only the user input. Additional data, such as the current Gantt state, is requested separately when needed.

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

```ts
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
        tools,
        tool_choice: 'auto',
    });

    const assistantMessage = response.choices[0].message;
});
```

The system message is stored in the conversation history and added only once per session.

## Tool schema

The backend defines tools that the model can call. Each tool describes an allowed action and its parameters.

For example, a `zoom` tool lets the model request a change of the Gantt scale:

```ts
export const tools = [
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

When the model returns a tool call, the backend parses its arguments and forwards it to the frontend. The frontend executes the command and returns the result.

```ts
function parseToolArguments(rawArgs: string): Record<string, unknown> {
    const parsed = JSON.parse(rawArgs);

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Tool arguments must be a JSON object');
    }

    return parsed as Record<string, unknown>;
}

function requestClientToolExecution(
    socket: Socket,
    payload: ClientToolRequest
): Promise<ClientToolResult> {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error(`Timed out waiting for tool result: ${payload.cmd}`));
        }, 15000);

        socket.emit('tool_call', payload, (result: ClientToolResult) => {
            clearTimeout(timeout);
            resolve(result);
        });
    });
}

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

## Command runner

The command runner defines how tool calls map to DHTMLX Gantt API calls. It acts as a boundary between model output and the Gantt API.

Only predefined commands should be executed. Every backend tool name must have a matching frontend command, and unknown commands must fail.

```ts
function runCommand(cmd: string, params: Record<string, unknown>): void {
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
}
```

## Execute commands

The frontend receives tool calls, executes the requested command, and returns the result. A successful command returns the current chart state with `gantt.serialize()`, while a failed command returns an error.

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

The model may request multiple tool calls in sequence. In this case, the backend repeats the execution cycle until the model returns a message without tool calls.

```ts
saveMessage(socket.id, {
    role: 'assistant',
    content: null,
    tool_calls: assistantMessage.tool_calls,
});

let currentMessage = assistantMessage;

while (currentMessage.tool_calls) {
    for (const call of currentMessage.tool_calls) {
        const result = await executeToolCall({ socket, call });

        saveMessage(socket.id, {
            role: 'tool',
            tool_call_id: call.id,
            content: JSON.stringify(result),
        });
    }

    const followUp = await openai.chat.completions.create({
        model: MODEL,
        messages: getHistory(socket.id),
        tools,
        tool_choice: 'auto',
    });

    currentMessage = followUp.choices[0].message;

    saveMessage(socket.id, currentMessage);
}

socket.emit('assistant_msg', currentMessage.content ?? '');
```

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
Gantt accepts both Date objects and ISO 8601 date strings, which are parsed automatically.

For other string formats, Gantt uses `gantt.config.date_format` and `gantt.templates.parse_date`.
:::

## Troubleshooting

If the model returns text instead of a tool call, the backend may not be passing `tools` to `chat.completions.create()` or `tool_choice` may not be set to `'auto'`.

If the backend waits for a tool result until timeout, the frontend may not be calling the acknowledgement callback in the tool call handler.

If a command appears successful but the Gantt chart does not change, the command runner may be reporting success for unsupported commands. Only executed commands should return `{ ok: true, cmd, data }`.

If `JSON.parse` fails while reading tool arguments, return a deterministic error or store `{ ok: false, error }` as the tool result so the model can produce a useful response.

If the model updates the wrong task, the integration may be missing a state-reading step (`get_gantt_state`) or validation of task ids on the frontend.

## Summary

The integration connects an AI assistant to DHTMLX Gantt through backend tool calls and frontend command execution.

The backend handles model calls, tool schemas, and conversation history. The frontend executes approved commands on the Gantt instance and returns the current chart state.

The command runner defines the boundary between model output and the Gantt API: only explicitly supported commands can modify the chart.

After each tool call, the backend stores the result and calls the model again so the final assistant response is based on the actual execution result.

## Related Materials

- [Gantt Maker AI Demo](https://github.com/DHTMLX/gantt-maker-ai-demo)
- [Live Gantt Maker AI Demo](https://dhtmlx.com/docs/demo/ai-gantt-maker/)
- [DHTMLX Gantt documentation](https://docs.dhtmlx.com/gantt/)
- [OpenAI API documentation](https://developers.openai.com/api/docs)
- [Socket.IO documentation](https://socket.io/docs/v4/)

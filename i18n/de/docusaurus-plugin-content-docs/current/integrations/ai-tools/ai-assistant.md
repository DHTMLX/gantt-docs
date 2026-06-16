---
title: "Einen KI-Assistenten mithilfe von Tool-Aufrufen integrieren"
sidebar_label: "KI-Assistent"
description: "So integrieren Sie einen KI-Assistenten mit DHTMLX Gantt über Backend-Tool-Aufrufe und Frontend-Befehlsausführung"
---

# Einen KI-Assistenten mithilfe von Tool-Aufrufen integrieren

Dieses Leitfaden zeigt, wie man einen Chat-Assistenten mit einer DHTMLX Gantt-Anwendung über Tool-Aufrufe verbindet.

- Backend: verarbeitet Modellaufrufe, speichert den Gesprächsstatus und entscheidet, welche Aktionen ausgeführt werden können.
- Frontend: führt genehmigte Befehle aus und aktualisiert das Gantt-Diagramm im Browser.

Eine vollständige Beispielimplementierung finden Sie hier: [Gantt Maker AI Demo](https://github.com/DHTMLX/gantt-maker-ai-demo).

Siehe den Abschnitt „Features“ in der Demo für eine vollständige Liste der unterstützten Fähigkeiten.

Die folgenden Abschnitte konzentrieren sich auf das minimale Integrationsmuster.

## Voraussetzungen

- Node.js 20+
- Einen OpenAI API-Schlüssel oder jeden Anbieter, der einen kompatiblen Chat Completions-Endpunkt mit Tool-Calling bereitstellt (richten Sie `OPENAI_BASE_URL` darauf aus)
- Vertrautheit mit Socket.IO, dem OpenAI Chat Completions Tool-Calling-Format und der DHTMLX Gantt-API

## Wie die Integration funktioniert

Jede Benutzernachricht durchläuft diesen Ablauf:

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

## Demo ausführen

Die Demo unter [DHTMLX/gantt-maker-ai-demo](https://github.com/DHTMLX/gantt-maker-ai-demo) wird mit drei Laufmodi geliefert – Docker (produktion), Docker (Entwicklung mit heißem Reload) und normales `npm` – abgedeckt in ihrer [README](https://github.com/DHTMLX/gantt-maker-ai-demo#quick-start). Der kürzeste Weg:

```bash
git clone https://github.com/DHTMLX/gantt-maker-ai-demo.git
cd gantt-maker-ai-demo
cp .env.example .env
# bearbeiten Sie .env und setzen OPENAI_API_KEY
docker compose up --build
```

Öffnen Sie `http://localhost`. Das Frontend hört auf Port 80, das Backend auf Port 3001.

Der restliche Teil dieses Leitfadens erläutert das Integrationsmuster. Dateipfade beziehen sich auf das Demo-Layout: `backend/server.ts`, `backend/helper.ts`, `backend/schemaList.ts`, `frontend/src/main.ts`, `frontend/src/chat-widget.ts`, `frontend/src/command-runner.ts`.

## Senden von Benutzernachrichten

Das Frontend sendet Benutzernachrichten an das Backend über Socket.IO. Die Nachricht enthält lediglich die Benutzereingabe – zusätzliche Daten wie der aktuelle Zustand des Gantt wird separat bei Bedarf angefordert (siehe unten unter [State-aware commands](#state-aware-commands)). Im Demo-Widget, das in `#chat_panel` eingebunden ist ([`frontend/src/chat-widget.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/frontend/src/chat-widget.ts)), wird dieser Aufruf umschlossen.

```ts
function sendUserMessage(message: string): void {
    if (!message) {
        return;
    }

    socket.emit('user_msg', JSON.stringify({ message }));
}
```

## Den Modellaufruf durchführen

Das Backend empfängt Benutzernachrichten, speichert sie in der Gesprächshistorie und ruft das Modell mit den verfügbaren Tools auf.

Der OpenAI-Client liest `OPENAI_API_KEY`, `OPENAI_BASE_URL` und `OPENAI_MODEL` aus der Umgebung. Verwenden Sie `OPENAI_BASE_URL`, um auf jeden Anbieter zu verweisen, der die OpenAI Chat Completions API bereitstellt. 

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

Die Systemnachricht wird in der Gesprächshistorie gespeichert und nur einmal pro Sitzung hinzugefügt.

:::note
Die Systemprompt des Demos ist ausführlicher ([`backend/server.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/server.ts)): erfordert, dass das Modell zuerst `get_gantt_state` aufruft, wenn eine Anfrage von bestehenden Tasks abhängt, gibt eine feste `SKIP_MESSAGE` zurück, wenn kein Tool übereinstimmt, und beschränkt endgültige Antworten auf 1–2 rein-textliche Sätze.
:::

## Tool-Schema

Das Backend definiert Tools, die das Modell aufrufen kann. Jedes Tool beschreibt eine erlaubte Aktion und deren Parameter. Die Demo-Datei [`backend/schemaList.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/schemaList.ts) definiert 27 solcher Tools – Aufgaben-CRUD, Abhängigkeiten, Styling, Skalen, Planung, Exporte – aber das Integrationsmuster bleibt unabhängig von der Größe gleich. Wir beginnen mit `zoom` als dem einfachsten Beispiel und erweitern später auf `update_tasks` für den zustandsabhängigen Fall.

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

## Weiterleitung von Tool-Aufrufen

Wenn das Modell einen Tool-Aufruf zurückgibt, analysiert das Backend dessen Argumente, leitet sie an das Frontend weiter und wartet auf das Ergebnis.

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
Die Demo extrahiert `TIMEDOUT_SECONDS = 15_000` in [`backend/constants.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/constants.ts) und behandelt `parseToolArguments` und `requestClientToolExecution` als private Hilfsfunktionen – nur `executeToolCall` wird exportiert. Die 15-Sekunden-Grenze deckt Netzwerk- und Gantt-Render-Zeiten ab; ziehen Sie sie nur enger zusammen, wenn Sie eine schnellere Garantie für das Frontend haben.
:::

## Befehlsausführer (Command runner)

Der Befehlsausführer definiert, wie Tool-Aufrufe in DHTMLX Gantt-API-Aufrufe übersetzt werden. Er bildet die Schranke zwischen Modell-Ausgabe und der Gantt-API.

Nur vordefinierte Befehle sollten ausgeführt werden. Jeder Backend-Tool-Name muss einen passenden Frontend-Befehl haben, unbekannte Befehle müssen geschlossen scheitern.

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

Der Runner wird beim Start einmal verbunden:

```ts
const runCommand = createCommandRunner(gantt);
```

:::note
Der Demo-Runner protokolliert `console.warn("Unknown cmd:", cmd, args)` statt im Default-Branch eine Ausnahme zu werfen. Das Werfen macht dem Modell den Fehler als Tool-Ergebnis zugänglich, sodass das LLM sich entschuldigen oder erneut versuchen kann. Das stille Warnen hält den Chat in Bewegung, verbirgt aber Abweichungen zwischen Backend- und Frontend-B Befehlslisten. Für eine echte Anwendung wählen Sie den Ansatz, der für Sie am besten funktioniert.
:::

## Befehle ausführen

Das Frontend empfängt Tool-Aufrufe, führt den angeforderten Befehl aus und gibt das Ergebnis über den Socket.IO-Ack-Callback zurück. Das Ack signalisiert dem Backend, dass der Tool-Vorgang abgeschlossen ist – ohne ihn bleibt die Konversation bis zum Timeout hängen. Ein erfolgreicher Befehl gibt den aktuellen Diagrammzustand mit `gantt.serialize()` zurück; ein fehlgeschlagener Befehl gibt einen Fehler zurück.

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

## Konversationsschleife

Tool-Aufrufe sind Teil der Konversation, nicht die endgültige Assistenten-Antwort. Nachdem ein Befehl ausgeführt wurde, wird das Ergebnis in der Gesprächshistorie gespeichert und dem Modell zurückgesendet.

Das Modell kann mehrere Tool-Aufrufe nacheinander anfordern: eine zustandsabhängige Aktualisierung, z. B. führt dies zu `get_gantt_state`, gefolgt von `update_tasks`. Der Backend wiederholt den Ausführungszyklus, bis das Modell eine Nachricht ohne Tool-Aufrufe zurückgibt – aber durch `MAX_TURNS` begrenzt, damit ein fehlverhaltendes Modell die Schleife nicht endlos aktiv halten kann.

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

Der Ablauf umfasst hier den ersten Modellaufruf aus dem vorhergehenden Abschnitt – dieser Aufruf befindet sich jetzt bei `turn === 0`, sodass „Call the model“ und „Conversation loop“ dasselbe `openai.chat.completions.create()`-Aufruf aus zwei Perspektiven beschreiben.

## Sicherheitsvorkehrungen

Eine produktive Integration benötigt einige zusätzliche Absicherungen über der grundlegenden Schleife:

- **Begrenzte Schleife.** `MAX_TURNS` (oben) begrenzt, wie viele Tool-/Antwort-Zyklen eine einzelne Benutzernachricht auslösen kann.
- **Sitzungsisolation pro Client.** Halten Sie die Historie in einer `Map<socketId, ChatMessages>` mit dem Schlüssel `socket.id`, sodass mehrere gleichzeitige Benutzer sich nie denselben Kontext ansehen. Die Demo-Fateilung `sessionMessagesByClient` in [`backend/helper.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/helper.ts) erledigt dies.
- **Leerlauf-Timeout.** Löschen Sie die Sitzungsverlauf nach einer Inaktivität (die Demo verwendet 30 Minuten), um Speicher zu binden und veraltete Zustände zu vermeiden, wenn ein lange nicht verbundener Client wiederkehrt.
- **Verlaufsbereinigung.** Token-Budgets sind begrenzt. Trimmen Sie nach *Blöcken* – jede Benutzer-Nachricht und ihre vollständige Assistenz-Antwort (einschließlich jeglicher Tool-Aufruf-/Tool-Ergebnis-Kette) bildet einen Block – sodass Sie nie einen Tool-Aufruf-Zyklus über die Trennlinie hinweg umbrechen. Halten Sie die System-Nachricht fest an Index 0. Die Demo-`trimHistory()` in [`backend/helper.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/backend/helper.ts) hält die letzten `MAX_MESSAGES = 20` Blöcke.
- **Validierung von Tool-Argumenten.** Die obige Helferfunktion `parseToolArguments` erzwingt nur „ist ein JSON-Objekt“. Darüber hinaus validieren Sie gegen das JSON-Schema, das Sie mit dem Modell registriert haben, oder akzeptieren Sie, dass der Runner fehlerhafte Argumente am Rand abfangen wird.

## Zustandserfassende Befehle

Einige Befehle hängen nicht vom aktuellen Diagrammzustand ab (z. B. `zoom`). Befehle, die vorhandene Tasks ändern, benötigen Zugriff auf den aktuellen Gantt-Zustand, damit das Modell Task-IDs referenzieren und Updates vorbereiten kann.

Das `get_gantt_state`-Tool liefert das aktuelle Ergebnis von `gantt.serialize()` ohne das Diagramm zu verändern. Das Modell kann dann `update_tasks` aufrufen, um basierend auf diesem Zustand Änderungen anzuwenden.

```text
User: Move the QA task two days later
  -> get_gantt_state
  -> tool result (gantt.serialize())
  -> update_tasks
  -> tool result with updated gantt.serialize()
  -> final assistant reply
```

Tool-Schema zum Lesen des aktuellen Zustands:

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

Tool-Schema zum Aktualisieren vorhandener Tasks:

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

Die Fälle des Frontend-Befehlsausführers:

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
Dieses `update_tasks`-Beispiel ist absichtlich minimal. Der Runner des Demos in [`frontend/src/command-runner.ts`](https://github.com/DHTMLX/gantt-maker-ai-demo/blob/main/frontend/src/command-runner.ts) ergänzt Produktionsbestandteile: Er überspringt Tasks des Typs `"project"` (aus den Kind-Elementen neu berechnet), parsed eingehende Daten mit `gantt.templates.parse_date`, und ruft `gantt.calculateEndDate` auf, um sicherzustellen, dass `start_date`, `end_date` und `duration` konsistent bleiben, wenn das Modell nur einige von ihnen sendet. Übernehmen Sie diese Logik, wenn Sie dieses Muster an ein Live-Diagramm anschließen.

Gantt akzeptiert sowohl `Date`-Objekte als auch ISO 8601-Strings out of the box. Für andere String-Formate konfigurieren Sie `gantt.config.date_format` und überschreiben Sie `gantt.templates.parse_date`.
::: 

## Troubleshooting

- **Der Backend wartet auf ein Tool-Ergebnis bis zum Timeout.** Das Frontend ruft den Ack-Callback nicht auf. Jedes Branch des `socket.on('tool_call')`-Handlers – inklusive des Catch-Blocks – muss `ack()` aufrufen.

- **Das Modell gibt Text statt eines Tool-Aufrufs zurück.** Dem Backend werden keine `tools` beim Aufruf von `chat.completions.create()` übergeben, oder `tool_choice` ist nicht `'auto'`. Kleinere Modelle (z. B. `gpt-4.1-nano`) neigen zudem zu Drift; versuchen Sie zuerst `gpt-5-nano` oder `gpt-4.1-mini`.

- **Ein Befehl scheint erfolgreich zu sein, aber das Gantt-Diagramm ändert sich nicht.** Der Runner gibt `{ ok: true }` für einen nicht unterstützten Befehl zurück. Machen Sie den Default-Branch des `switch` scheitern (werfen Sie eine Ausnahme oder geben Sie eine Warnung aus) und stellen Sie sicher, dass jeder Backend-Tool-Name einen passenden Frontend-Fall hat.

- **`JSON.parse` schlägt beim Lesen der Tool-Argumente fehl.** Geben Sie einen deterministischen Fehler zurück oder speichern Sie `{ ok: false, error }` als Tool-Ergebnis, damit das Modell wiederherstellen kann, statt zu stoppen.

- **Das Modell aktualisiert die falsche Aufgabe.** Die Integration fehlt eine Zustand-lesende Schritt (`get_gantt_state`) oder eine Task-ID-Validierung im Frontend. Fügen Sie die Regel `MUST call get_gantt_state first` in die System-Prompt ein und prüfen Sie `gantt.isTaskExists()` im Runner.

## Zusammenfassung

Die Integration verbindet einen KI-Assistenten mit DHTMLX Gantt über Backend-Tool-Aufrufe und Frontend-Befehlsausführung.

Das Backend verarbeitet Modellaufrufe, Tool-Schemata und Gesprächshistorie. Das Frontend führt genehmigte Befehle auf der Gantt-Instanz aus und gibt den aktuellen Diagrammzustand zurück.

Der Befehlsausführer definiert die Grenze zwischen Modell-Ausgabe und der Gantt-API: Nur explizit unterstützte Befehle dürfen das Diagramm ändern.

Nach jedem Tool-Aufruf speichert das Backend das Ergebnis und ruft das Modell erneut auf, sodass die endgültige Assistenten-Antwort auf dem tatsächlichen Ausführungsergebnis basiert.

## Verwandte Materialien

- [Live Gantt Maker AI Demo](https://dhtmlx.com/docs/demo/ai-gantt-maker/)
- [Gantt Maker AI Demo on GitHub](https://github.com/DHTMLX/gantt-maker-ai-demo) - full source for the integration described here
- [Demo README](https://github.com/DHTMLX/gantt-maker-ai-demo#readme) - setup, env vars, Docker and npm run modes
- [DHTMLX Gantt documentation](https://docs.dhtmlx.com/gantt/)
- [OpenAI API - function calling](https://developers.openai.com/api/docs)
- [Socket.IO documentation](https://socket.io/docs/v4/)
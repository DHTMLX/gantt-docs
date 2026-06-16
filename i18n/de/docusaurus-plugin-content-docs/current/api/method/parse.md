---
sidebar_label: parse
title: parse Methode
description: "Lädt Daten aus einer clientseitigen Ressource"
---

# parse

### Description

@short: Lädt Daten aus einer clientseitigen Ressource

@signature: parse: (data: string | GanttData, type?: string) => void

### Parameters

- `data` - (erforderlich) *string | GanttData* - ein String oder Objekt, das [Daten](guides/loading.md#dataproperties) repräsentiert
- `type` - (optional) *string* - optional, (`'json'`, `'xml'`) der Datentyp. Der Standardwert ist `'json'`

### Example

~~~jsx
gantt.parse({
    tasks: [
        { id: 1, text: "Project #2", start_date: "2026-04-01", duration: 18 },
        { id: 2, text: "Task #1", start_date: "2026-04-02", duration: 8, progress: 0.6, parent: 1 },
        { id: 3, text: "Task #2", start_date: "2026-04-11", duration: 8, progress: 0.6, parent: 1 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: "1" },
        { id: 2, source: 2, target: 3, type: "0" }
    ]
});
~~~

### Related samples

- [Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)

### Details

Die `parse()`-Methode akzeptiert das oberste Objekt [GanttData](guides/data-model.md#ganttdata).

Gantt erwartet, dass das Array mit Aufgaben entweder `data` oder `tasks` benannt wird, während das Array mit Verknüpfungen `links` benannt wird.

Dies ist die Liste der unterstützten Eigenschaften:

- `tasks` oder `data` - (`(SerializedTask | Task)[]`) das Array mit Task-Daten
- `links?` - (`(SerializedLink | Link)[]`) das Array mit Link-Daten
- `resources?` - (`Partial<ResourceItem>[]`) das Array mit Ressourcen-Daten
- `assignments?` - (`(SerializedResourceAssignment | ResourceAssignment)[]`) das Array mit Zuweisungsdaten
- `baselines?` - (`(SerializedBaseline | Baseline)[]`) das Array mit Baseline-Daten
- `collections?` - (`Record<string, Array<Record<string, unknown>>>`) das Objekt mit benutzerdefinierten Sammlungen

~~~js
gantt.parse({
    tasks: [
        { id: 1, start_date: "2026-04-01", duration: 42, text: "House Construction" },
        { id: 2, start_date: "2026-04-20", duration: 60, text: "Interior Works" }
    ],
    links: [
        { id: "1", source: "1", target: "2", type: "0" }
    ],
    resources: [
        { id: 1, text: "Anna, Architect", unit: "hours/day", default_value: 8, type: "work" }
    ],
    assignments: [
        { task_id: "1", resource_id: "1", value: "8" },
        {
            task_id: "2",
            resource_id: "1",
            value: "8",
            mode: "fixedDates",
            start_date: "2026-04-20",
            end_date: "2026-04-22",
            duration: 4,
            delay: 2
        },
        {
            task_id: "2",
            resource_id: "1",
            value: "8",
            start_date: new Date("2026-04-20T00:00:00"),
            end_date: new Date("2026-04-23T00:00:00")
        }
    ],
    baselines: [
        {
            id: "b1",
            task_id: 1,
            start_date: "2026-03-28",
            duration: 42,
            end_date: "2026-05-09"
        }
    ]
});
~~~

`data` und `tasks` sind alternative Schlüssel für dasselbe Aufgaben-Array. In neuem Code wird `tasks` bevorzugt.

Wenn Sie Daten aus einem in Code erstellten JavaScript-Objekt laden, können `Task`, `ResourceAssignment` und andere Laufzeitobjekte `Date` enthalten. Wenn Daten als JSON mit dem Server ausgetauscht werden, sollten Datumsfelder Zeichenketten sein. Die nachsichtige Eingabeform, die entweder Datum-Formen (und eine optionale `id`) akzeptiert, ist [`TaskInput`](guides/data-model.md#taskinput).

### Legacy Compatibility Names

Ältere API-Dokumente und Typings verwenden weiterhin mehrere Kompatibilitäts-Aliasnamen:

- `DataToLoad1`, `DataToLoad2`
- `NewTask` - Legacy-Alias von [`TaskInput`](guides/data-model.md#taskinput)
- `NewResourceItem`
- `NewAssignmentItem`

Diese Namen bleiben aus Gründen der Rückwärtskompatibilität erhalten. Die kanonische Übersicht der akzeptierten Shapes findet sich im Artikel [Data Model](guides/data-model.md).

### Collections

Das `collections`-Objekt ermöglicht das Laden benutzerdefinierter Listen, die von Editoren und Steuerelementen verwendet werden. Die Eigenschaftsnamen können beliebig gewählt werden, und jeder Wert sollte ein Array von Sammlungsitems sein.

~~~js
gantt.parse({
    tasks: [
        { id: "1", text: "Task #1", priority: 1, start_date: "2026-04-01", duration: 1 },
        { id: "2", text: "Task #2", priority: 2, start_date: "2026-04-02", duration: 1 },
        { id: "3", text: "Task #3", priority: 3, start_date: "2026-04-03", duration: 1 },
        { id: "4", text: "Task #4", priority: 1, start_date: "2026-04-04", duration: 1 }
    ],
    links: [],
    collections: {
        task_priority: [
            { key: 1, label: "High" },
            { key: 2, label: "Normal" },
            { key: 3, label: "Low" }
        ]
    }
});
~~~

### Empty Task Array

Wenn Sie Daten laden möchten, die keine Aufgaben enthalten, müssen Sie trotzdem ein leeres Aufgaben-Array definieren:

~~~js
gantt.parse({
    tasks: [],
    links: [
        { id: 1, source: 1, target: 2, type: "1" },
        { id: 2, source: 2, target: 3, type: "0" }
    ]
});
~~~

### Related API

- [load](api/method/load.md)

### Related Guides

- [Data Model](guides/data-model.md)
- [Data Loading](guides/loading.md)
- [Supported Data Formats](guides/supported-data-formats.md)
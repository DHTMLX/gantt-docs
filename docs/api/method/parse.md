---
sidebar_label: parse
title: parse method
description: "loads data from a client-side resource"
---

# parse

### Description

@short: Loads data from a client-side resource

@signature: parse: (data: string | GanttData, type?: string) => void

### Parameters

- `data` - (required) *string | GanttData* - a string or object which represents [data](guides/loading.md#dataproperties)
- `type` - (optional) *string* - optional, (`'json'`, `'xml'`) the data type. The default value is `'json'`

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

The `parse()` method accepts the top-level [GanttData](guides/data-model.md#ganttdata) object.

Gantt expects that the array with tasks will be named either `data` or `tasks`, while the array with links will be named `links`.

This is the list of supported properties:

- `tasks` or `data` - (`(SerializedTask | Task)[]`) the array with task data
- `links?` - (`(SerializedLink | Link)[]`) the array with link data
- `resources?` - (`Partial<ResourceItem>[]`) the array with resource data
- `assignments?` - (`(SerializedResourceAssignment | ResourceAssignment)[]`) the array with assignment data
- `baselines?` - (`(SerializedBaseline | Baseline)[]`) the array with baseline data
- `collections?` - (`Record<string, Array<Record<string, unknown>>>`) the object with custom collections

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

`data` and `tasks` are alternative keys for the same task array. `tasks` is preferred in new code.

If you load data from a JavaScript object created in code, `Task`, `ResourceAssignment`, and other runtime objects may contain `Date`. When data is exchanged as JSON with the server, date fields should be strings.

### Legacy Compatibility Names

Older API docs and typings still use several compatibility aliases:

- `DataToLoad1`, `DataToLoad2`
- `NewTask`
- `NewResourceItem`
- `NewAssignmentItem`

These names are kept for backward compatibility. The canonical overview of the accepted shapes is the [Data Model](guides/data-model.md) article.

### Collections

The `collections` object allows loading custom lists used by editors and controls. The property names can be arbitrary, and each value should be an array of collection items.

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

If you want to load data that does not contain tasks, you still need to define an empty task array:

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

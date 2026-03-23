---
title: "Data Model"
sidebar_label: "Data Model"
description: "Overview of the Gantt data model: serialized types for loading and saving, runtime types used inside the chart, and legacy compatibility aliases."
---

# Data Model

Gantt works with two main representations of task and link data:

- **Serialized**: JSON-compatible shapes with string dates, used in server responses, persisted JSON, and DataProcessor exchange
- **Runtime**: client-side objects with `Date` fields and computed `$`-prefixed properties, returned by methods like [gantt.getTask()](api/method/gettask.md) and [gantt.getLink()](api/method/getlink.md)

The canonical top-level payload passed to [gantt.parse()](api/method/parse.md) is `GanttData`.

Core runtime and serialized types are exported from `@dhx/gantt`. Wrapper packages re-export and consume these types in their public APIs, but the exact prop surface differs by wrapper.

## Data Lifecycle

Data flows through two transformations:

1. **Loading**: serialized task and link data is passed to `gantt.parse()` or `gantt.load()`. Gantt parses date strings into `Date` objects and adds computed `$`-prefixed properties, producing runtime `Task` and `Link` objects.
2. **Saving**: when changes are sent to the server via DataProcessor, dates are serialized back to strings and temporary `$`-prefixed fields are stripped.

See [Data Loading](guides/loading.md) and [Server-Side Integration](guides/server-side.md) for behavior details.

## SerializedTask

The JSON-compatible task shape. Date fields are strings, so this object can be safely passed through `JSON.stringify()` / `JSON.parse()`.

~~~ts
interface SerializedTask {
    id?: string | number;
    start_date?: string;
    end_date?: string;
    duration?: number;
    text?: any;
    type?: string;
    parent?: string | number;
    progress?: number;
    open?: boolean;

    auto_scheduling?: boolean;
    unscheduled?: boolean;
    constraint_date?: string;
    constraint_type?: string;
    deadline?: string;

    color?: string;
    textColor?: string;
    progressColor?: string;
    bar_height?: number;
    row_height?: number;
    hide_bar?: boolean;

    baselines?: SerializedBaseline[];
    calendar_id?: string | number;
    editable?: boolean;
    readonly?: boolean;
    render?: string;
    resource?: string[];
    rollup?: boolean;

    [customProperty: string]: any;
}
~~~

For a meaningful scheduled task in serialized JSON, provide one valid scheduling combination:

- `start_date` + `duration`
- `start_date` + `end_date`
- `duration` + `end_date`

If `unscheduled: true`, dates can be omitted.

For detailed property descriptions, see [Task Properties](guides/task-properties.md).

## SerializedLink

~~~ts
interface SerializedLink {
    id: string | number;
    source: string | number;
    target: string | number;
    type: string;
    lag?: number;
    readonly?: boolean;
    editable?: boolean;

    [customProperty: string]: any;
}
~~~

For detailed property descriptions, see [Link Properties](guides/link-properties.md).

## Runtime Task and Link

After loading, Gantt stores tasks as runtime `Task` objects.

Main differences from `SerializedTask`:

- task date fields such as `start_date`, `end_date`, `constraint_date`, and `deadline` are JavaScript `Date` objects
- computed `$`-prefixed fields are added and maintained on the client

Common runtime-only task fields:

| Property | Type | Description |
|----------|------|-------------|
| `$index` | number | Global vertical position in the visible list |
| `$level` | number | Nesting depth in the task hierarchy |
| `$open` | boolean | Whether the branch is currently expanded |
| `$source` | Array | IDs of links going out of the task |
| `$target` | Array | IDs of links coming into the task |
| `$has_child` | boolean | Whether the task has child tasks |

The runtime `Link` object has the same field set as `SerializedLink`, but it is the client-side object returned by methods like `gantt.getLink()`.

For the full runtime lists, see [Task Properties](guides/task-properties.md#dynamic-properties) and [Link Properties](guides/link-properties.md).

## Supporting Types

### Baseline and SerializedBaseline

~~~ts
interface Baseline {
    id: string | number;
    task_id: string | number;
    start_date: Date;
    duration: number;
    end_date: Date;
    [customProperty: string]: any;
}

interface SerializedBaseline {
    id?: string | number;
    task_id?: string | number;
    start_date?: string;
    duration?: number;
    end_date?: string;
    [customProperty: string]: any;
}
~~~

### ResourceAssignment and SerializedResourceAssignment

~~~ts
interface ResourceAssignment {
    id: string | number;
    task_id: string | number;
    resource_id: string | number;
    value: number | string;
    delay: number;
    start_date: Date;
    end_date: Date;
    duration: number;
    mode: string;
    [customProperty: string]: any;
}

interface SerializedResourceAssignment {
    id?: string | number;
    task_id: string | number;
    resource_id: string | number;
    value?: number | string;
    mode?: string;
    delay?: number;
    start_date?: string;
    duration?: number;
    end_date?: string;
    [customProperty: string]: any;
}
~~~

### ResourceItem

~~~ts
interface ResourceItem {
    id: string | number;
    text?: string;
    parent?: string | number;
    open?: boolean;
    unit?: string | number;
    default_value?: string | number;
    [customProperty: string]: any;
}
~~~

See [Inbuilt Baselines](guides/inbuilt-baselines.md) and [Resource Management](guides/resource-management.md) for feature-specific details.

## GanttData

The object passed to [gantt.parse()](api/method/parse.md):

~~~ts
type GanttData =
  | {
      data: (SerializedTask | Task)[];
      tasks?: undefined;
      links?: (SerializedLink | Link)[];
      resources?: Partial<ResourceItem>[];
      assignments?: (SerializedResourceAssignment | ResourceAssignment)[];
      baselines?: (SerializedBaseline | Baseline)[];
      collections?: Record<string, Array<Record<string, unknown>>>;
    }
  | {
      tasks: (SerializedTask | Task)[];
      data?: undefined;
      links?: (SerializedLink | Link)[];
      resources?: Partial<ResourceItem>[];
      assignments?: (SerializedResourceAssignment | ResourceAssignment)[];
      baselines?: (SerializedBaseline | Baseline)[];
      collections?: Record<string, Array<Record<string, unknown>>>;
    };
~~~

Both `tasks` and `data` keys are accepted for the task array. `tasks` is preferred in new code.

~~~js
gantt.parse({
    tasks: [
        { id: 1, text: "Project #1", start_date: "2026-04-01", duration: 18 },
        { id: 2, text: "Task #1", start_date: "2026-04-02", duration: 8, parent: 1 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: "0" }
    ]
});
~~~

## Legacy Compatibility Aliases

Older API docs and typings still use several compatibility names:

- `DataToLoad1`, `DataToLoad2`: deprecated keyed variants of `GanttData`
- `NewTask`: deprecated compatibility alias for `Partial<SerializedTask> | Partial<Task> | string | {}`
- `NewResourceItem`: deprecated compatibility alias for `Partial<ResourceItem>`
- `NewAssignmentItem`: deprecated compatibility alias for `SerializedResourceAssignment | ResourceAssignment`

These names are kept for backward compatibility, but `GanttData`, `SerializedTask`, `SerializedLink`, `Task`, and `Link` are the canonical concepts used in this guide.

## Date Rules

- When exchanging JSON with the server, use strings for date fields
- If you build a JavaScript object directly and pass it to `gantt.parse()`, runtime task and assignment objects may contain `Date`
- After loading, Gantt stores task dates as `Date` objects in runtime `Task`
- Since v9.1.3, Gantt automatically detects ISO 8601 date strings

For details and examples, see [Data Loading - Loading Task Dates](guides/loading.md#loadingtaskdates).

## Custom Properties

All data types support custom properties via `[customProperty: string]: any`. Custom properties are preserved on the client side after loading and can be used in templates, columns, editors, and backend storage.

~~~js
gantt.parse({
    tasks: [
        {
            id: 1,
            text: "Task #1",
            start_date: "2026-04-01",
            duration: 10,
            priority: "high",
            owner: "John"
        }
    ],
    links: []
});

const task = gantt.getTask(1);
console.log(task.priority); // "high"
~~~

---
title: "数据模型"
sidebar_label: "数据模型"
description: "Gantt 数据模型概览：用于加载和保存的序列化类型、图表内部使用的运行时类型，以及向后兼容的别名。"
---

# 数据模型

Gantt 使用两种主要表示方式来处理任务和连线数据：

- **Serialized**: JSON 兼容的结构，日期为字符串，用于服务器响应、持久化 JSON，以及 DataProcessor 交换
- **Runtime**: 客户端对象，包含 `Date` 字段和以 `$` 前缀的计算属性，由诸如 [gantt.getTask()](api/method/gettask.md) 与 [gantt.getLink()](api/method/getlink.md) 这样的方法返回

当你向 Gantt 提供数据（而不是读取回数据）时，日期字段可以是 `Date` 或 `string`。 [`TaskInput`](#taskinput) 类型捕捉了这种宽松的输入形状，因此在你生成或在应用状态中保存的数据不必固定为 `Task` 或 `SerializedTask`。

传递给 [gantt.parse()](api/method/parse.md) 的规范顶层载荷是 `GanttData`。

核心运行时类型和序列化类型都从 `@dhx/gantt` 导出。包装包会在其公共 API 中重新导出并使用这些类型，但具体的属性表面在不同包装之间略有差异。

## 数据生命周期

数据通过两次变换流动：

1. **加载（Loading）**：序列化的任务和连线数据传给 `gantt.parse()` 或 `gantt.load()`。Gantt 会将日期字符串解析为 `Date` 对象，并添加以 `$` 开头的计算字段，生成运行时的 `Task` 和 `Link` 对象。
2. **保存（Saving）**：当更改通过 DataProcessor 发送到服务器时，日期会被重新序列化为字符串，临时的 `$`-前缀字段会被剥离。

有关行为细节，请参阅 [Data Loading](guides/loading.md) 和 [Server-Side Integration](guides/server-side.md)。

## SerializedTask

JSON 兼容的任务形状。日期字段为字符串，因此此对象可以安全地经过 `JSON.stringify()` / `JSON.parse()`。

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
    target?: string;

    [customProperty: string]: any;
}
~~~ 

要获得一个在序列化 JSON 中有意义的计划任务，请提供以下其中一个有效的排程组合：

- `start_date` + `duration`
- `start_date` + `end_date`
- `duration` + `end_date`

如果 `unscheduled: true`，日期可以省略。

有关更详细的属性描述，请参阅 [Task Properties](guides/task-properties.md)。

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

有关详细的属性描述，请参阅 [Link Properties](guides/link-properties.md)。

## Runtime Task 与 Link

加载完成后，Gantt 将任务以运行时的 `Task` 对象存储。

与 `SerializedTask` 的主要区别：

- 任务日期字段，如 `start_date`、`end_date`、`constraint_date` 和 `deadline`，是 JavaScript 的 `Date` 对象
- 客户端会新增并维护以 `$` 开头的计算字段

常见的仅在运行时使用的任务字段：

| 属性 | 类型 | 描述 |
|----------|------|-------------|
| `$index` | number | 可见列表中的全局垂直位置 |
| `$level` | number | 任务层级中的嵌套深度 |
| `$open` | boolean | 当前分支是否已展开 |
| `$source` | Array | 发出该任务的连线的 IDs |
| `$target` | Array | 进入该任务的连线的 IDs |
| `$has_child` | boolean | 该任务是否有子任务 |

运行时的 `Link` 对象具有与 `SerializedLink` 相同的字段集合，但它是通过诸如 `gantt.getLink()` 之类的方法在客户端返回的对象。

如需完整的运行时列表，请参阅 [Task Properties](guides/task-properties.md#dynamic-properties) 与 [Link Properties](guides/link-properties.md)。

## TaskInput

当你向 Gantt 提供任务数据 - [gantt.parse()](api/method/parse.md)、[gantt.addTask()](api/method/addtask.md)、`tasks` 配置/属性，或你自己的应用存储 - 使用 `TaskInput`。它是宽松的输入形态：日期字段接受 `Date` 或 `string`，并且每个字段（包括 `id`）都是可选的，因为在未提供时 Gantt 会生成一个 id。

~~~ts
type TaskInput = Partial<SerializedTask> | Partial<Task>;
~~~

在你向 Gantt 提供数据或保存数据到应用状态时，使用 `TaskInput`；在通过诸如 `gantt.getTask()` 等方法读取 Gantt 自身对象时，使用 `Task`（运行时，日期为 `Date`，带 `$` 前缀字段），而在与服务器交换的 JSON 使用 `SerializedTask`（仅字符串日期）。

~~~ts
// 应用程序拥有的任务数据提交给 Gantt - 两种日期形式均可接受：
const tasks: TaskInput[] = [
    { id: 1, text: "Task #1", start_date: new Date(2026, 3, 1), duration: 5 },
    { id: 2, text: "Task #2", start_date: "2026-04-02", duration: 3 }
];
~~~

将应用状态存储为 `TaskInput[]` 比将其类型化为 `SerializedTask[]` 或 `Task[]` 更可取：它在种子数据使用 `Date` 对象但类型期望字符串（或相反）的情况下避免不一致。仅在日期表示固定的边界处，才选择使用 `Task` / `SerializedTask`。

## Supporting Types

### Baseline 和 SerializedBaseline

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

### ResourceAssignment 与 SerializedResourceAssignment

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

有关功能特定细节，请参阅 [Inbuilt Baselines](guides/inbuilt-baselines.md) 与 [Resource Management](guides/resource-management.md)。

## GanttData

传递给 [gantt.parse()](api/method/parse.md) 的对象：

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

两种形式的 `tasks` 与 `data` 键都被接受作为任务数组。`tasks` 在新代码中更受推崇。

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

较旧的 API 文档和类型仍然使用若干向后兼容的名称：

- `DataToLoad1`, `DataToLoad2`：`GanttData` 的已弃用带键值的变体
- `NewTask`：[`TaskInput`](#taskinput) 的向后兼容别名（定义为 `TaskInput | string | {}`），为向后兼容而保留。新代码中优先使用 `TaskInput`。
- `NewResourceItem`：对 `Partial<ResourceItem>` 的已弃用向后兼容别名
- `NewAssignmentItem`：对 `SerializedResourceAssignment | ResourceAssignment` 的已弃用向后兼容别名

为向后兼容而保留这些名称，但在本指南所使用的规范概念中，`GanttData`、`TaskInput`、`SerializedTask`、`SerializedLink`、`Task` 与 `Link` 是核心概念。

## 日期规则

- 与服务器交换 JSON 时，请使用日期字段的字符串表示
- 如果你直接构造 JavaScript 对象并将其传给 `gantt.parse()`，运行时的任务和分配对象可能包含 `Date`
- 加载后，Gantt 会在运行时的 `Task` 中把任务日期存储为 `Date` 对象
- 自 v9.1.3 起，Gantt 会自动检测 ISO 8601 日期字符串

有关详情和示例，请参阅 [Data Loading - Loading Task Dates](guides/loading.md#loadingtaskdates)。

## 自定义属性

所有数据类型都支持通过 `[customProperty: string]: any` 的自定义属性。自定义属性在加载后保留在客户端，并可用于模板、列、编辑器和后端存储。

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

## 任务顺序

Gantt 按照 `tasks` 数组中出现的顺序显示任务。数组中每一项的位置，以及 `parent` 层级，是在客户端决定可视顺序的唯一因素。运行时的 `$index` 属性是根据该数组位置计算的，并不会被持久化。

这意味着数据源控制显示顺序。如果用户可以通过拖放重新排序任务，数据源需要记住新的顺序，以便后续加载时任务按正确的顺序返回。

标准做法是在后端存储中使用一个数值型的 `sortorder` 列。数据源在返回任务前按此列排序。`sortorder` 只是后端概念——Gantt 不在客户端读取或解释它。若载荷中包含，它作为一个 [custom property] 传递，但没有内置效果。

当用户在 UI 上重新排序任务时，Gantt 会在通过 DataProcessor 发送给服务器的任务对象上填充 `target` 属性。该值指示任务相对于其同级任务的移动位置：

- `target="taskId"` - 把此任务放在具有给定 id 的任务之前
- `target="next:taskId"` - 把此任务放在具有给定 id 的任务之后

后端使用该值为受影响的任务重新计算 `sortorder`。

关于完整的实现模式——数据库架构、初始值和重新排序逻辑——请参阅 Server-Side Integration 指南中的 [Storing the Order of Tasks](guides/server-side.md#storingtheorderoftasks)。如需客户端拖放配置，请参阅 [Reordering Tasks](guides/reordering-tasks.md)。
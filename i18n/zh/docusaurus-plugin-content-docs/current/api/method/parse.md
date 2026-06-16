---
sidebar_label: parse
title: parse method
description: "从客户端资源加载数据"
---

# parse

### Description

@short: 從客戶端資源載入數據

@signature: parse: (data: string | GanttData, type?: string) => void

### Parameters

- `data` - (必填) *string | GanttData* - 一个表示 [data](guides/loading.md#dataproperties) 的字符串或对象
- `type` - (可选) *string* - 可选，(`'json'`, `'xml'`) 数据类型。默认值为 `'json'`

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

`parse()` 方法接受頂層 [GanttData](guides/data-model.md#ganttdata) 物件。

Gantt 要求任務陣列命名為 `data` 或 `tasks`，連結陣列命名為 `links`。

以下是支援的屬性列表：:

- `tasks` or `data` - (`(SerializedTask | Task)[]`) 包含任务数据的数组
- `links?` - (`(SerializedLink | Link)[]`) 包含链接数据的数组
- `resources?` - (`Partial<ResourceItem>[]`) 包含资源数据的数组
- `assignments?` - (`(SerializedResourceAssignment | ResourceAssignment)[]`) 包含分配数据的数组
- `baselines?` - (`(SerializedBaseline | Baseline)[]`) 基线数据的数组
- `collections?` - (`Record<string, Array<Record<string, unknown>>>`) 自定义集合对象

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

`data` 和 `tasks` 是同一個任務陣列的備選鍵。在新程式碼中，建議使用 `tasks`。

如果您從程式碼建立的 JavaScript 物件載入數據，`Task`、`ResourceAssignment` 和其他執行時間物件可能包含 `Date` 欄位。當資料以 JSON 格式與伺服器交換時，日期欄位應為字串。接受兩種日期格式（以及可選的 `id`）的寬鬆輸入格式是 [`TaskInput`](guides/data-model.md#taskinput)

### 旧兼容名称

舊版 API 文件和類型定義仍然使用多個相容性別名稱：

- `DataToLoad1`, `DataToLoad2`
- `NewTask` - 旧别名，等同于 [`TaskInput`](guides/data-model.md#taskinput)
- `NewResourceItem`
- `NewAssignmentItem`

这些名称为向后兼容而保留。接受形状的规范概览请参阅 [Data Model](guides/data-model.md) 文章。

### 集合

`collections` 物件允許載入編輯器和控制項使用的自訂清單。屬性名稱可以任意指定，每個值都應該是集合項目陣列。

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

### 空的任务数组

如果数据中不包含任务，仍需定义一个空的 tasks 数组:

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
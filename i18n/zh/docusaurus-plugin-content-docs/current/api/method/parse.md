---
sidebar_label: parse
title: parse method
description: "从客户端资源加载数据"
---

# parse

### Description

@short: 从客户端资源加载数据

@signature: parse: (data: string | DataToLoad1 | DataToLoad2, type?: string) =\> void

### Parameters

- `data` - (required) *string* - | DataToLoad     表示[数据](https://docs.dhtmlx.com/gantt/desktop__loading.html#dataproperties)的字符串或对象
- `type` - (optional) *string* - 可选，(<i>'json', 'xml'</i>) 指定数据类型。默认值为 <i>'json'</i>

### Example

~~~jsx
gantt.parse({
    data:[
        {id:1, text:"Project #2", start_date:"01-04-2023", duration:18},
        {id:2, text:"Task #1",    start_date:"02-04-2023", duration:8,
            progress:0.6, parent:1},
        {id:3, text:"Task #2",    start_date:"11-04-2023", duration:8,
            progress:0.6, parent:1}
    ],
    links:[
        { id:1, source:1, target:2, type:1},
        { id:2, source:2, target:3, type:0}
    ]
});
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)

### Details

Gantt 期望任务数组命名为 **data** 或 **tasks**，而链接数组应命名为 **links**。

数据结构如下:

- **data** - (*[] | NewTask[]*) - 包含任务数据的数组
- **links?** - (*Link[]*) - 包含链接数据的数组
- **resources?** - (*NewResourceItem[]*) - 包含资源数据的数组
- **assignments?** - (*NewAssignmentItem[]*) - 包含分配数据的数组
- **collections?** - (*Сollections*) - 存放自定义数据数组的对象

~~~js
gantt.parse({
    data: [
        { id: 1, start_date: "2025-09-23", duration: 42, 
            text: "House Construction" },
        { id: 2, start_date: "2025-12-02", duration: 60, 
            text: "House Construction" },
    ],
    "links": [
        { id: "1", source: "1", target: "2", type: "0" },
    ],
    "resources": [
        { id: 1, text: "Anna, Architect", unit: "hours/day", 
            default_value: 8, type: "work" },
    ],
    "assignments": [
      { task_id: "1", resource_id: "1", value: "8" },
      { task_id: "2", resource_id: "1", value: "8", 
            mode: "fixedDates", start_date: "2025-09-23", 
            end_date: "2025-09-25", duration: 4, delay: 2,  },
      { task_id: "2", resource_id: "1", value: "8", 
            start_date: new Date("2025-09-23 00:00:00"), 
            end_date: new Date("2025-09-26 00:00:00"), },
    ]
})
~~~

**data** 或 **tasks** 数组应包含 **NewTask** 对象，它们与 **Task** 对象不同。NewTask 可以是字符串或空对象。这些对象可以拥有与[**Task**对象](guides/task-properties.md)相同的属性，也可以添加自定义属性。与 **Task** 对象不同的是，以 *$* 开头的属性会被忽略，日期可以是字符串。

具体说明:

- **NewTask** - (*string | {} | object*) - 添加到 Gantt 的任务对象，可能包含以下属性:
    - **_id?_** - (*string | number*) - 可选，任务 ID，缺失时自动生成。
    - **_start_date?_** - (*string | Date*) - 可选，任务开始日期。
    - **_duration?_** - (*number*) - 可选，任务持续时间。
    - **_end_date?_** - (*string | Date*) - 可选，任务结束日期。
    - **_text?_** - (*string*) - 可选，任务名称。
    - **_open?_** - (*boolean*) - 可选，加载时任务是否展开。
    - **_parent?_** - (*string | number*) - 可选，父任务 ID。
    - **_constraint_date?_** - (*string | Date*) - 可选，约束日期。
    - **_[customProperty: string]_** - (*any*) - 其他任意属性，包括来自[**Task**对象](guides/task-properties.md)的属性。

这不是任务属性的完整列表，更多内容请参见[此文档](guides/task-properties.md)。

~~~js
gantt.parse({
    data: [
        { id: 1, start_date: "2025-09-23", duration: 42, 
            text: "House Construction" },
    ]
})
~~~

---

**links** 数组应包含 [**Link**对象](guides/link-properties.md)。

~~~js
gantt.parse({
    data: [],
    links: [
        { id: "1", source: "1", target: "2", type: "0" },
    ]
})
~~~

---

**resources** 数组期望包含 **NewResourceItem** 对象，可能包括:

- **NewResourceItem** - (*object*) - 添加到 Gantt 的资源条目，属性示例:
    - **_id?_** - (*string | number*) - 可选，资源 ID，缺失时自动生成。
    - **_parent?_** - (*string | number*) - 可选，父资源 ID。
    - **_text?_** - (*string*) - 可选，资源名称。
    - **_open?_** - (*boolean*) - 可选，加载时资源是否展开。
    - **_unit?_** - (*string | number*) - 可选，资源分配单位。
    - **_default_value?_** - (*string | number*) - 可选，lightbox 中显示的默认分配值。
    - **_[customProperty: string]_** - (*any*) - 其他附加属性。

~~~js
gantt.parse({
    data: [],
    resources: [
        { id: 1, text: "Anna, Architect", unit: "hours/day", 
            default_value: 8, type: "work" },
    ]
})
~~~

---

**assignments** 数组期望包含 **NewAssignmentItem** 对象，属性示例如下:

- **NewAssignmentItem** - (*object*) - 添加到 Gantt 的分配条目，可能包括:
    - **_id?_** - (*string | number*) - 可选，分配 ID，缺失时自动生成。
    - **_task_id_** - (*string | number*) - 分配的任务 ID。
    - **_resource_id_** - (*string | number*) - 分配的资源 ID。
    - **_value_** - (*number | string*) - 可选，分配值。
    - **_mode?_** - (*string*) - 可选，计算模式:"default"|"fixedDates"|"fixedDuration"。
    - **_delay?_** - (*number*) - 可选，分配开始与任务开始的差异。
    - **_start_date?_** - (*string | Date*) - 可选，分配开始日期。
    - **_duration?_** - (*number*) - 可选，分配持续时间。
    - **_end_date?_** - (*string | Date*) - 可选，分配结束日期。
    - **_[customProperty: string]_** - (*any*) - 其他自定义属性。

~~~js
gantt.parse({
    data: [],
    assignments: [
      { task_id: "1", resource_id: "1", value: "8" },
    ]
})
~~~

---

**collections** 对象用于加载自定义数据。其属性名可随意，值为包含集合项的数组:

- **[collectionName: string]** - (*[] | СollectionItem[]*) - 集合项数组。

每个 **СollectionItem** 是一个包含任意属性的对象:

- **[itemProperty: string]** - (*any*) - 任意自定义属性。

~~~js
gantt.parse({
    data: [
        { "id": "1", "text": "Task #1", "priority": 1, 
            "start_date": "02-04-2019", "duration": 1, },
        { "id": "2", "text": "Task #2", "priority": 2,  
            "start_date": "01-04-2019", "duration": 1, },
        { "id": "3", "text": "Task #3", "priority": 3,  
            "start_date": "02-04-2019", "duration": 1, },
        { "id": "4", "text": "Task #4", "priority": 1,  
            "start_date": "03-04-2019", "duration": 1, },
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

---

如果数据中不包含任务，仍需定义一个空的 tasks 数组:

~~~js
gantt.parse({
    tasks:[],
    links:[
        { id:1, source:1, target:2, type:1},
        { id:2, source:2, target:3, type:0}
    ]
});
~~~

<br>
从 v8.0 版本开始，你还可以通过 **parse()** 方法同时加载资源和资源分配，以及任务和链接:

~~~js
gantt.parse({
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            owner: [
                {
                    resource_id: "6",
                    value: 3,
                    start_date: "03-04-2024 00:00",
                    end_date: "05-04-2024 00:00",
                }
            ]
        },
        ...
    ],
    links: [],
    resources: [
        {id: 6, text: "John", unit: "hours/day" },
        {id: 7, text: "Mike", unit: "hours/day" },
        {id: 8, text: "Anna", unit: "hours/day" },
        {id: 9, text: "Bill", unit: "hours/day" },
        {id: 10, text: "Floe", unit: "hours/day" }
    ]
});
~~~

更多详情请参见[这里](guides/resource-management.md)。

### Related API
- [load](api/method/load.md)

### Related Guides
- [数据加载](guides/loading.md)
- [支持的数据格式](guides/supported-data-formats.md)
- [支持的数据格式](guides/supported-data-formats.md) (阅读如何加载带有 Collections 的 JSON)


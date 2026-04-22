---
sidebar_label: isCriticalTask
title: isCriticalTask 方法
description: "检查指定任务是否为关键任务"
---

# isCriticalTask

:::info
此功能仅在 PRO 版中可用。 
:::

### Description

@short: 检查指定任务是否为关键任务

@signature: isCriticalTask: (task: Task) => boolean

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` value` - (boolean) - 'true' 表示指定的任务是关键任务, 'false' 表示否则

### Example

~~~jsx
const tasks = {
    data:[
       {id:1, text:"Project #1", start_date:"01-04-2023", duration:18, type:"project"},
       {id:2, text:"Task #1", start_date:"02-04-2023", duration:8, parent:1},
       {id:3, text:"Task #2", start_date:"13-04-2023", duration:8, parent:1}
    ],
    links:[
       {id:1, source:1, target:2, type:"1"},
       {id:2, source:2, target:3, type:"0"}
    ]
};

gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticalTask(gantt.getTask(2));// ->'false' /*!*/
gantt.isCriticalTask(gantt.getTask(3));// ->'true' /*!*/
~~~

### Related samples
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
此方法在 **critical_path** 扩展中定义，因此您需要激活 [critical_path](guides/extensions-list.md#critical-path) 插件。请在 [Critical Path](guides/critical-path.md) 文章中阅读详细信息。
:::

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalLink](api/method/iscriticallink.md)
- [getSlack](api/method/getslack.md)

### Related Guides
- [Critical Path](guides/critical-path.md)
---
sidebar_label: getSlack
title: getSlack 方法
description: "检查在当前持续时间单位内，一个任务在开始影响其他任务之前还能剩余多少时间"
---

# getSlack

:::info
The **getSlack** 方法仅在 PRO 版中可用。
:::

### Description

@short: 检查在当前持续时间单位内，一个任务在开始影响其他任务之前还能剩余多少时间

### Parameters

- `task1` - (required) *object* - 要检查 slack 的第 1 个任务对象
- `task2` - (required) *object* - 要检查 slack 的第 2 个任务对象

### Returns
- ` slack` - (number,string) - 两个任务之间的 slack，单位为当前持续时间单位，或 'Infinity'，如果任务未链接

### Example

~~~jsx
const tasks = {
    data:[
       {id:1, text:"Project #1", start_date:"01-04-2013", duration:18, type:"project"},
       {id:2, text:"Task #1", start_date:"02-04-2013",duration:8, parent:1},
       {id:3, text:"Task #2", start_date:"13-04-2013",duration:8, parent:1}
    ],
    links:[
       {id:1, source:1, target:2, type:"1"},
       {id:2, source:2, target:3, type:"0"}
    ]
};
 
gantt.config.highlight_critical_path = true; 
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getSlack(gantt.getTask(2), gantt.getTask(3)); // -> 1  /*!*/
~~~

### Related samples
- [关键路径](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::warning
The **getSlack** 方法已弃用。请使用以下方法获取任务的自由缓冲时间和总缓冲时间：
:::

~~~js
gantt.getFreeSlack(task);

gantt.getTotalSlack(task);
~~~

:::note
该方法在 **critical_path** 扩展中定义，因此您需要在页面中引入它。请在 [关键路径](guides/critical-path.md) 文章中了解详细信息。
:::

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [关键路径](guides/critical-path.md)
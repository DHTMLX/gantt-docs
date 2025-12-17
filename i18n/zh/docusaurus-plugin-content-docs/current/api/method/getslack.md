---
sidebar_label: getSlack
title: getSlack method
description: "确定一个任务在当前持续时间单位内，在影响其他任务之前还有多少时间余量"
---

# getSlack

### Description

@short: 确定一个任务在当前持续时间单位内，在影响其他任务之前还有多少时间余量

### Parameters

- `task1` - (required) *object* - 第一个要检查余量的任务对象
- `task2` - (required) *object* - 第二个要检查余量的任务对象

### Returns
- ` slack` - (number,string) - 两个任务之间的余量，单位为当前持续时间单位；如果任务之间没有链接，则返回 'Infinity'

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
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
 **getSlack** 方法已被弃用。请改用以下方法获取任务的自由余量或总余量: 
:::

~~~js
gantt.getFreeSlack(task);

gantt.getTotalSlack(task);
~~~

<br>
:::info
 **getSlack** 方法仅在 PRO 版本中可用。 
:::

:::note
 该方法属于 **critical_path** 扩展的一部分，请确保在页面中包含此扩展。更多细节请参阅 [关键路径](guides/critical-path.md) 文章。 
:::

![iscritical_path](/img/iscritical_path.png)

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [关键路径](guides/critical-path.md)


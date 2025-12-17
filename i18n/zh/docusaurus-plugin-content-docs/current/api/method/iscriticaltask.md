---
sidebar_label: isCriticalTask
title: isCriticalTask method
description: "检查给定任务是否为关键任务"
---

# isCriticalTask
:::info
 此功能仅包含在 PRO 版本中。 
:::
### Description

@short: 检查给定任务是否为关键任务

@signature: isCriticalTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - 要检查的任务对象

### Returns
- ` value` - (boolean) - 如果任务是关键任务则返回 'true'，否则返回 'false'

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
 此方法是 **critical_path** 扩展的一部分，因此请确保启用 [critical_path](guides/extensions-list.md) 插件。更多信息，请参阅 [关键路径](guides/critical-path.md) 文章。 
:::


![iscritical_path](/img/iscritical_path.png)

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalLink](api/method/iscriticallink.md)
- [getSlack](api/method/getslack.md)

### Related Guides
- [关键路径](guides/critical-path.md)


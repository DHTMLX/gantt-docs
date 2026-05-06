---
sidebar_label: isCriticalTask
title: isCriticalTask метод
description: "проверяет, является ли указанная задача критической"
---

# isCriticalTask

:::info
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Проверяет, является ли указанная задача критической

@signature: isCriticalTask: (task: Task) => boolean

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` value` - (boolean) - 'true' если указанная задача критическая, 'false' в противном случае

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
Этот метод определён в расширении **critical_path**, поэтому нужно активировать плагин [critical_path](guides/extensions-list.md#critical-path). Подробности см. в статье [Critical Path](guides/critical-path.md).
:::

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalLink](api/method/iscriticallink.md)
- [getSlack](api/method/getslack.md)

### Related Guides
- [Critical Path](guides/critical-path.md)
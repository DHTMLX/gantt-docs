---
sidebar_label: isCriticalTask
title: isCriticalTask method
description: "проверяет, является ли указанная задача критической"
---

# isCriticalTask
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Проверяет, является ли указанная задача критической

@signature: isCriticalTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - объект задачи для проверки

### Returns
- ` value` - (boolean) - возвращает 'true', если задача критическая, иначе 'false'

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
Этот метод является частью расширения **critical_path**, поэтому убедитесь, что плагин [critical_path](guides/extensions-list.md#criticalpath) включён. Для дополнительной информации смотрите статью [Критический путь](guides/critical-path.md). 
:::

![iscritical_path](/img/iscritical_path.png)

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalLink](api/method/iscriticallink.md)
- [getSlack](api/method/getslack.md)

### Related Guides
- [Критический путь](guides/critical-path.md)


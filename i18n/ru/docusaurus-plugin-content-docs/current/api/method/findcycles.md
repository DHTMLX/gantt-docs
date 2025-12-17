---
sidebar_label: findCycles
title: findCycles method
description: "возвращает все циклы зависимостей, найденные в диаграмме"
---

# findCycles
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Возвращает все циклы зависимостей, найденные в диаграмме

@signature: findCycles: () =\> any[]

### Returns
- ` cycles` - (array) - массив, содержащий обнаруженные циклы зависимостей в gantt

### Example

~~~jsx
var cycles = gantt.findCycles();
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Для работы метода должен быть включён плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). 
:::

Каждый элемент массива *cycles* представляет собой набор задач и связей, образующих цикл.

~~~js
[ 
    { 
        tasks: [//id задач, участвующих в цикле], 
        links: [//id связей, участвующих в цикле]
    },
    {
        
        tasks: [...], 
        links: [...]
    }
]
~~~

Пример для наглядности:

![on_autoschedule_circular_link](/img/on_autoschedule_circular_link.png)


- Задача #3 имеет id = 10
- Задача #4.1 имеет id = 12
- Связь от конца задачи #3 к началу задачи #4 имеет id = 1
- Связь от конца задачи #4.1 к началу задачи #3 имеет id = 2

Метод *gantt.findCycles* вернёт следующий результат:

~~~js
[ 
    { 
        tasks: ["10", "12"], 
        links: ["1", "2"]
    }
]
~~~

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)

### Change log
- добавлено в версии 4.1


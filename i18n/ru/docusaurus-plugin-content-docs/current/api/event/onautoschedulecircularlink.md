---
sidebar_label: onAutoScheduleCircularLink
title: onAutoScheduleCircularLink event
description: "срабатывает, если во время автоматического планирования обнаружены циклы зависимостей"
---

# onAutoScheduleCircularLink
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Вызывается, если во время автоматического планирования обнаружены циклы зависимостей

@signature: onAutoScheduleCircularLink: (groups: any[]) =\> void;

### Parameters

- `groups` - (required) *array* - массив циклов зависимостей, обнаруженных в gantt

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleCircularLink",function(groups){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Метод требует включенного плагина [auto_scheduling](guides/extensions-list.md#autoscheduling). 
:::

Задачи не изменяются при срабатывании этого события. 

Параметр *groups* представляет собой массив циклов зависимостей, обнаруженных в gantt. 
Каждый элемент массива является группой задач и связей, образующих цикл.

~~~js
[ 
    { 
        tasks: [//ids of tasks connected in a loop], 
        links: [//ids of links connected in a loop]
    },
    {
        
        tasks: [...], 
        links: [...]
    }
]
~~~

Смотрите приведенный ниже пример:

- Задача #3 имеет id = 10
- Задача #4.1 имеет id = 12
- Связь от конца Задачи #3 к началу Задачи #4 имеет id = 1
- Связь от конца Задачи #4.1 к началу Задачи #3 имеет id = 2

Параметр *groups* будет содержать следующий объект группы:

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
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- добавлено в версии 4.1
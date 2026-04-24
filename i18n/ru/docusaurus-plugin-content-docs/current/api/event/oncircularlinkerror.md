---
sidebar_label: onCircularLinkError
title: onCircularLinkError event
description: "срабатывает, когда обнаружена циклическая ссылка и автоматическое планирование невозможно"
---

# onCircularLinkError
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Срабатывает, когда обнаружена циклическая ссылка и автоматическое планирование невозможно

@signature: onCircularLinkError: (link: Link, group: any) => void;

### Parameters

- `link` - (required) *Link* - объект ссылки
- `group` - (required) *object* - группа задач и связей, образующая цикл

### Example

~~~jsx
gantt.attachEvent("onCircularLinkError",function(link, group){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Расширение auto Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

The **group** parameter presents an object which includes a group of tasks and links connected in a loop.

~~~js
{ 
    tasks: [//ids of tasks connected in a loop], 
    links: [//ids of links connected in a loop]
}
~~~

:::note
Метод требует, чтобы плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) был активирован. 
:::

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
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)

### Change log
- Параметр **group** добавлен в версии 4.1.
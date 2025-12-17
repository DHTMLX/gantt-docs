---
sidebar_label: onAfterTaskAutoSchedule
title: onAfterTaskAutoSchedule event
description: "Срабатывает для каждой задачи, которая была автоматически запланирована"
---

# onAfterTaskAutoSchedule
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает для каждой задачи, которая была автоматически запланирована

@signature: onAfterTaskAutoSchedule: (task: Task, start: Date, link: Link, predecessor: Task) =\> void;

### Parameters

- `task` - (required) *Task* - объект задачи
- `start` - (required) *Date* - обновленная дата начала
- `link` - (required) *Link* - объект связи, ответственный за ограничение
- `predecessor` - (required) *Task* - объект предшествующей задачи

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAutoSchedule",function(task, start, link, predecessor){
    // разместите здесь вашу пользовательскую логику
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Это событие является частью расширения **auto_scheduling**, поэтому убедитесь, что плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) включен. Подробнее можно узнать в статье [Автоматическое планирование](guides/auto-scheduling.md). 
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
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)


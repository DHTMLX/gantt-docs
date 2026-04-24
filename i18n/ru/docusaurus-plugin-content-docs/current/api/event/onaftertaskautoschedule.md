---
sidebar_label: onAfterTaskAutoSchedule
title: событие onAfterTaskAutoSchedule
description: "вызывает для каждой задачи, которая была автоматически запланирована"
---

# onAfterTaskAutoSchedule
:::info
Эта функциональность доступна только в версии PRO.
:::
### Description

@short: Вызывает для каждой задачи, которая была автоматически запланирована

@signature: onAfterTaskAutoSchedule: (task: Task, start: Date, link: Link, predecessor: Task) =\> void;

### Parameters

- `task` - (required) *Task* - объект задачи
- `start` - (required) *Date* - новая дата начала
- `link` - (required) *Link* - объект связи, который создает ограничение 
- `predecessor` - (required) *Task* - объект предшествующей задачи

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAutoSchedule",function(task, start, link, predecessor){
    // разместитемздесь вашу пользовательскую логику пользовательскую логику
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Это событие определяется в расширении **auto_scheduling**, поэтому вам необходимо активировать плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). Подробности читайте в статье [Auto Scheduling](guides/auto-scheduling.md). 
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
- [Auto Scheduling](guides/auto-scheduling.md)
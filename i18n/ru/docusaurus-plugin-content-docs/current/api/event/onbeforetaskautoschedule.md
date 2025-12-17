---
sidebar_label: onBeforeTaskAutoSchedule
title: onBeforeTaskAutoSchedule event
description: "Срабатывает для каждой задачи, которая переназначается"
---

# onBeforeTaskAutoSchedule
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает для каждой задачи, которая переназначается

@signature: onBeforeTaskAutoSchedule: (task: Task, start: Date, link: Link, predecessor: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - объект задачи
- `start` - (required) *Date* - новая дата начала
- `link` - (required) *Link* - объект связи, ответственный за ограничение
- `predecessor` - (required) *Task* - объект предшествующей задачи

### Returns
- ` result` - (boolean) - указывает, будет ли выполнено действие по умолчанию события (<b>true</b>) или оно будет остановлено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAutoSchedule",function(task, start, link, predecessor){
    // разместите здесь свою логику
    return true;
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Это событие является частью расширения **auto_scheduling**, поэтому обязательно включите плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). Подробнее см. в статье [Автоматическое планирование](guides/auto-scheduling.md). 
:::


Это событие можно заблокировать. Возврат значения *false* остановит дальнейшую обработку.

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
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)


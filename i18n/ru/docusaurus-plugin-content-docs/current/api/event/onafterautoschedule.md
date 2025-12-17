---
sidebar_label: onAfterAutoSchedule
title: onAfterAutoSchedule event
description: "Срабатывает после завершения процесса автопланирования."
---

# onAfterAutoSchedule
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает после завершения процесса автопланирования.

@signature: onAfterAutoSchedule: (taskId: string | number, updatedTasks: any[]): void;

### Parameters

- `taskId` - (required) *string | number* - ID корневой задачи
- `updatedTasks` - (required) *array* - массив, содержащий ID задач, которые были перепланированы

### Example

~~~jsx
gantt.attachEvent("onAfterAutoSchedule",function(taskId, updatedTasks){
    // вставьте здесь вашу пользовательскую логику
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Это событие является частью расширения **auto_scheduling**, поэтому убедитесь, что плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) включен. Подробнее см. в руководстве [Автоматическое планирование](guides/auto-scheduling.md). 
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
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)


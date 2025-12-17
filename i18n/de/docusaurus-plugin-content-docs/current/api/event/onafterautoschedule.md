---
sidebar_label: onAfterAutoSchedule
title: onAfterAutoSchedule event
description: "Löst aus, sobald der Autoscheduling-Prozess abgeschlossen ist."
---

# onAfterAutoSchedule
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Löst aus, sobald der Autoscheduling-Prozess abgeschlossen ist.

@signature: onAfterAutoSchedule: (taskId: string | number, updatedTasks: any[]): void;

### Parameters

- `taskId` - (required) *string | number* - die ID der Wurzelaufgabe
- `updatedTasks` - (required) *array* - ein Array, das die IDs der neu geplanten Aufgaben enthält

### Example

~~~jsx
gantt.attachEvent("onAfterAutoSchedule",function(taskId, updatedTasks){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Dieses Event ist Teil der **auto_scheduling**-Erweiterung, stellen Sie daher sicher, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktiviert ist. Weitere Details finden Sie im ["Auto Scheduling"](guides/auto-scheduling.md) Leitfaden. 
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
- ["Auto Scheduling"](guides/auto-scheduling.md)


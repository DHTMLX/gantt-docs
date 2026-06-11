---
sidebar_label: onAutoScheduleConflict
title: onAutoScheduleConflict event
description: "fires for each conflict found during auto scheduling"
---

# onAutoScheduleConflict
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Fires for each conflict found during auto scheduling

@signature: onAutoScheduleConflict: (conflict: object) =\> void;

### Parameters

- `conflict` - (required) *object* - the conflict found during scheduling. The set of fields depends on the conflict `kind`.

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleConflict", function(conflict){
    if (conflict.kind === "constraint-violation") {
        console.warn(`Task ${conflict.taskId}: the ${conflict.constraintType} constraint could not be satisfied`);
    }
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
This event is defined in the **auto_scheduling** extension, so you need to activate the [auto_scheduling](guides/extensions-list.md#autoscheduling) plugin. Read the details in the [Auto Scheduling](guides/auto-scheduling.md) article. 
:::

The event fires once for every conflict that auto scheduling runs into. Auto scheduling still produces a result - the event lets you surface the conflicts in the UI or react to them.

The `conflict.kind` field defines the type of the conflict and the available fields:

| `kind` | Description | Fields |
|---|---|---|
| `"constraint-violation"` | A task's constraint could not be satisfied at its scheduled position. | `taskId`, `constraintType`, `required` *(Date)*, `actual` *(Date)* |
| `"calendar-non-working"` | A task landed on its own non-working time. Reported only when [strict_calendar](api/config/auto_scheduling.md#strict_calendar) is enabled. | `taskId`, `proposedDate` *(Date)*, `snappedDate` *(Date)* |
| `"unscheduled-dependency"` | A task depends on a task that is not scheduled. | `taskId`, `blockedBy` |

Dependency loops are reported through the separate [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md) event, not here.

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)
- [onAutoScheduleNoConverge](api/event/onautoschedulenoconverge.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- added in version 10.0

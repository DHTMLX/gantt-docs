---
sidebar_label: onAutoScheduleNoConverge
title: onAutoScheduleNoConverge event
description: "fires when auto scheduling cannot settle on a stable result"
---

# onAutoScheduleNoConverge
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Fires when auto scheduling cannot settle on a stable result

@signature: onAutoScheduleNoConverge: (result: object) =\> void;

### Parameters

- `result` - (required) *object* - details of the scheduling run, including the number of `iterations` performed and the list of `conflicts` collected.

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleNoConverge", function(result){
    console.warn("Auto scheduling did not converge", result.conflicts);
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
This event is defined in the **auto_scheduling** extension, so you need to activate the [auto_scheduling](guides/extensions-list.md#autoscheduling) plugin. Read the details in the [Auto Scheduling](guides/auto-scheduling.md) article. 
:::

Auto scheduling places tasks in repeated passes until the result stops changing. This event fires when the result keeps changing and the engine stops after a number of passes without reaching a stable state. In practice this points to an over-constrained project — for example, a set of constraints and dependencies that cannot all be satisfied at the same time.

The `result` parameter contains the details of the run:

- `iterations` - *number* - how many passes were performed.
- `converged` - *boolean* - `false` in this event.
- `conflicts` - *array* - the conflicts collected during scheduling (see [onAutoScheduleConflict](api/event/onautoscheduleconflict.md) for the conflict fields).

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
- [onAutoScheduleConflict](api/event/onautoscheduleconflict.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- added in version 10.0

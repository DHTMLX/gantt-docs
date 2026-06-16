---
sidebar_label: onAutoScheduleConflict
title: onAutoScheduleConflict event
description: "在自动排程过程中为每个冲突触发"
---

# onAutoScheduleConflict
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 自動調度過程中發現的每個衝突都會觸發警報

@signature: onAutoScheduleConflict: (conflict: object) => void;

### Parameters

- `conflict` - (必填) *object* - 调度过程中发现的冲突。冲突的字段集合取决于冲突 `kind`。

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleConflict", function(conflict){
    if (conflict.kind === "constraint-violation") {
        console.warn(`Task ${conflict.taskId}: the ${conflict.constraintType} constraint could not be satisfied`);
    }
});
~~~

### Related samples
- [自动排程扩展](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
该事件在 **auto_scheduling** 扩展中定义，因此需要激活 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。请在 [Auto Scheduling](guides/auto-scheduling.md) 文章中阅读详细信息。
:::

该事件会针对自动排程遇到的每一个冲突触发一次。自动排程仍然会产生一个结果——通过该事件可以在界面上暴露冲突或对其进行处理。

字段 `conflict.kind` 定义了冲突的类型以及可用字段：

| `kind` | 说明 | 字段 |
|---|---|---|
| `"constraint-violation"` | 任务在其计划位置所设定的约束无法被满足。 | `taskId`, `constraintType`, `required` *(Date)*, `actual` *(Date)* |
| `"calendar-non-working"` | 任务落在其非工作时间。仅在启用 [strict_calendar](api/config/auto_scheduling.md#strict_calendar) 时报告。 | `taskId`, `proposedDate` *(Date)*, `snappedDate` *(Date)* |
| `"unscheduled-dependency"` | 任务依赖于尚未排程的任务。 | `taskId`, `blockedBy` |

依赖循环通过单独的 [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md) 事件报告，而不是这里。

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
- 于 10.0 版本新增
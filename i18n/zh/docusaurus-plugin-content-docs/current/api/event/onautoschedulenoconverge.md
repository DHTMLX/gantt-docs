---
sidebar_label: onAutoScheduleNoConverge
title: onAutoScheduleNoConverge 事件
description: "当自动调度无法收敛到稳定结果时触发"
---

# onAutoScheduleNoConverge
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 当自动调度无法收敛到稳定结果时触发

@signature: onAutoScheduleNoConverge: (result: object) => void;

### Parameters

- `result` - (必需) *object* - 调度运行的详细信息，包括执行的 `iterations` 次数以及收集的 `conflicts` 列表。

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleNoConverge", function(result){
    console.warn("Auto scheduling did not converge", result.conflicts);
});
~~~

### Related samples
- [自动调度扩展](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
该事件在 **auto_scheduling** 扩展中定义，因此你需要启用 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。有关详细信息，请参阅 [自动调度](guides/auto-scheduling.md) 文章。
:::

自动调度将任务放入重复的传递中，直到结果不再变化。此事件在结果持续变化且在若干次传递后未达到稳定状态时触发。实际情况通常指向一个约束过于严格的项目，例如一组约束和依赖关系不能同时全部被满足。

`result` 参数包含运行的详细信息：

- `iterations` - *number* - 进行了多少次传递。
- `converged` - *boolean* - 在此事件中为 `false`。
- `conflicts` - *array* - 调度过程中收集的冲突（请参阅 [onAutoScheduleConflict](api/event/onautoscheduleconflict.md) 了解冲突字段）。

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
- [自动调度](guides/auto-scheduling.md)

### Change log
- 于 10.0 版本新增
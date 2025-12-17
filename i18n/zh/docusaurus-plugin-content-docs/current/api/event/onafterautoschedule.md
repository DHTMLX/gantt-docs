---
sidebar_label: onAfterAutoSchedule
title: onAfterAutoSchedule event
description: "当自动排程过程完成时触发。"
---

# onAfterAutoSchedule
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 当自动排程过程完成时触发。

@signature: onAfterAutoSchedule: (taskId: string | number, updatedTasks: any[]): void;

### Parameters

- `taskId` - (required) *string | number* - 根任务的ID
- `updatedTasks` - (required) *array* - 包含被重新排程任务ID的数组

### Example

~~~jsx
gantt.attachEvent("onAfterAutoSchedule",function(taskId, updatedTasks){
    // 在这里插入您的自定义逻辑
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 此事件属于**auto_scheduling**扩展的一部分，因此请确保启用[auto_scheduling](guides/extensions-list.md)插件。更多详情请参阅[自动调度](guides/auto-scheduling.md)指南。 
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
- [自动调度](guides/auto-scheduling.md)


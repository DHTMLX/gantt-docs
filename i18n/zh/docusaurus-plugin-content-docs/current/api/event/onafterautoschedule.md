---
sidebar_label: onAfterAutoSchedule
title: onAfterAutoSchedule 事件
description: "在自动排程完成时触发"
---

# onAfterAutoSchedule
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 当自动排程完成时触发

@signature: onAfterAutoSchedule: (taskId: string | number, updatedTasks: any[]): void;

### Parameters

- `taskId` - (required) *string | number* - 根任务的 ID
- `updatedTasks` - (required) *array* - 重新排程任务的 ID 数组

### Example

~~~jsx
gantt.attachEvent("onAfterAutoSchedule",function(taskId, updatedTasks){
    // 在这里插入您的自定义逻辑
});
~~~

### Related samples
- [自动排程扩展](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details
:::note
此事件在 **auto_scheduling** 扩展中定义，因此您需要激活 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。请在 [Auto Scheduling](guides/auto-scheduling.md) 文章中阅读详细信息。 
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
- [自动排程](guides/auto-scheduling.md)
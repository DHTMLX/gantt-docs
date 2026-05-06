---
sidebar_label: onBeforeAutoSchedule
title: onBeforeAutoSchedule 事件
description: "在自动排程之前触发"
---

# onBeforeAutoSchedule
:::info
此功能仅在 PRO 版中提供。 
:::
### Description

@short: 在自动排程之前触发

@signature: onBeforeAutoSchedule: (taskId: string | number) => boolean;

### Parameters

- `taskId` - （必填）*string | number* - 根任务的 ID

### Returns
- `result` - (boolean) - 表示事件的默认操作是否将被触发（<b>true</b>）还是取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeAutoSchedule",function(taskId){
    // 在这里插入您的自定义逻辑
    return true;
});
~~~

### Related samples
- [自动排程扩展](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
此事件在 **auto_scheduling** 扩展中定义，因此您需要激活 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。请在 [自动排程](guides/auto-scheduling.md) 文章中阅读详细信息。 
:::

该事件是可阻塞的。返回 *false* 将取消后续处理。

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
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [自动排程](guides/auto-scheduling.md)
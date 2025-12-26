---
sidebar_label: onBeforeAutoSchedule
title: onBeforeAutoSchedule event
description: "在自动排程开始之前触发"
---

# onBeforeAutoSchedule
:::info
 该功能仅在PRO版本中可用。 
:::
### Description

@short: 在自动排程开始之前触发

@signature: onBeforeAutoSchedule: (taskId: string | number) =\> boolean;

### Parameters

- `taskId` - (required) *string | number* - 根任务的ID

### Returns
- ` result` - (boolean) - 决定事件的默认操作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeAutoSchedule",function(taskId){  
    // 在这里添加你的自定义逻辑  
    return true;  
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 此事件是**auto_scheduling**扩展的一部分，因此请确保已启用[auto_scheduling](guides/extensions-list.md)插件。更多信息请参见[自动调度](guides/auto-scheduling.md)文档。 
:::

此事件可以被阻止。返回*false*将停止后续处理。

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
- [自动调度](guides/auto-scheduling.md)


---
sidebar_label: onBeforeTaskAutoSchedule
title: onBeforeTaskAutoSchedule 事件
description: "在每个被重新排程的任务上触发"
---

# onBeforeTaskAutoSchedule
:::info
 该功能仅在 PRO 版本中可用。 
:::
### Description

@short: 对于每个被重新排程的任务触发

@signature: onBeforeTaskAutoSchedule: (task: Task, start: Date, link: Link, predecessor: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - 任务对象
- `start` - (required) *Date* - 一个新的开始日期
- `link` - (required) *Link* - 创建约束的链接对象
- `predecessor` - (required) *Task* - 前置任务对象

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否会触发 (<b>true</b>) 还是取消 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAutoSchedule",function(task, start, link, predecessor){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
此事件在 **auto_scheduling** 扩展中定义，因此你需要激活 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。请在 [Auto Scheduling](guides/auto-scheduling.md) 文章中了解详细信息。 
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
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)
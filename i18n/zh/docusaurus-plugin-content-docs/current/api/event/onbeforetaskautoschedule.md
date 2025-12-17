---
sidebar_label: onBeforeTaskAutoSchedule
title: onBeforeTaskAutoSchedule event
description: "触发于每个被重新安排时间的任务"
---

# onBeforeTaskAutoSchedule
:::info
 该功能仅在PRO版本中可用。 
:::
### Description

@short: 触发于每个被重新安排时间的任务

@signature: onBeforeTaskAutoSchedule: (task: Task, start: Date, link: Link, predecessor: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - 任务对象
- `start` - (required) *Date* - 新的开始日期
- `link` - (required) *Link* - 导致约束的链接对象
- `predecessor` - (required) *Task* - 前置任务对象

### Returns
- ` result` - (boolean) - 表示事件的默认动作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAutoSchedule",function(task, start, link, predecessor){
    // 在此处添加自定义逻辑
    return true;
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 该事件属于**auto_scheduling**扩展的一部分，请确保启用了[auto_scheduling](guides/extensions-list.md)插件。更多详情请参见 [自动调度](guides/auto-scheduling.md) 文章。 
:::

此事件可以被阻止。返回*false*将停止任何后续处理。

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
- [自动调度](guides/auto-scheduling.md)


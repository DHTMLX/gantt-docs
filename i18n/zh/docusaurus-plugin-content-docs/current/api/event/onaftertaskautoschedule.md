---
sidebar_label: onAfterTaskAutoSchedule
title: onAfterTaskAutoSchedule event
description: "触发每个被自动调度的任务"
---

# onAfterTaskAutoSchedule

### Description

@short: 触发每个被自动调度的任务

@signature: onAfterTaskAutoSchedule: (task: Task, start: Date, link: Link, predecessor: Task) =\> void;

### Parameters

- `task` - (required) *Task* - 任务对象
- `start` - (required) *Date* - 更新后的开始日期
- `link` - (required) *Link* - 导致约束的链接对象
- `predecessor` - (required) *Task* - 前置任务对象

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAutoSchedule",function(task, start, link, predecessor){
    // 在这里添加您的自定义逻辑
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
pronote 此功能仅在PRO版本中可用。 
:::
:::note
note 此事件是**auto_scheduling**扩展的一部分，因此请确保启用[auto_scheduling](guides/extensions-list.md#zidongpaicheng)插件。更多信息请参见[自动调度](guides/auto-scheduling.md)文章。 
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
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [自动调度](guides/auto-scheduling.md)


---
sidebar_label: onAfterTaskAutoSchedule
title: onAfterTaskAutoSchedule event
description: "对每个已自动排程的任务触发"
---

# onAfterTaskAutoSchedule
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 对于每个已自动排程的任务触发

@signature: onAfterTaskAutoSchedule: (task: Task, start: Date, link: Link, predecessor: Task) =\> void;

### Parameters

- `task` - (required) *Task* - 任务对象
- `start` - (required) *Date* - 一个新的起始日期
- `link` - (required) *Link* - 用于创建约束的链接对象
- `predecessor` - (required) *Task* - 前驱任务对象

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAutoSchedule",function(task, start, link, predecessor){
    // 在这里插入您的自定义逻辑
});
~~~

### Related samples
- [自动排程扩展](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
此事件在 **auto_scheduling** 扩展中定义，因此您需要激活 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。请在 [自动排程](guides/auto-scheduling.md) 文章中阅读详细信息。
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
- [自动排程](guides/auto-scheduling.md)
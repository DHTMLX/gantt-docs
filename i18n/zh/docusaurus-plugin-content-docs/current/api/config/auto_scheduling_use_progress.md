---
sidebar_label: auto_scheduling_use_progress
title: auto_scheduling_use_progress 配置
description: "设置调度算法处理已完成任务的方式"
---

# auto_scheduling_use_progress

:::info
此功能仅在 PRO 版本中可用。 
:::

:::warning
该属性在 v9.1 中已被废弃，请改用 [gantt.config.auto_scheduling](api/config/auto_scheduling.md#use_progress) 的 `use_progress` 属性。
:::

### Description

@short: 设置调度算法处理已完成任务的方式

@signature: auto_scheduling_use_progress: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_use_progress = true;

gantt.init("gantt_here");
~~~

**默认值：** false


### Details

:::note
此配置在 **auto_scheduling** 或 **critical_path** 扩展中定义，因此您需要激活 [auto_scheduling](guides/extensions-list.md#autoscheduling) 或 [critical_path](guides/extensions-list.md#critical-path) 插件。请在 [Auto Scheduling](guides/auto-scheduling.md) 与 [Critical Path](guides/critical-path.md) 文章中阅读详细信息。
:::

当启用该属性时，关键路径、松弛时间和自动调度算法将考虑任务进度的数值，这与这些方法在 MS Project 中的工作方式类似，即：

1) 已完成的任务（进度为 100% 的任务）始终没有松弛时间；

2) 已完成的任务不参与自动调度的计算。连接前置任务与已完成任务的关系将被忽略；

3) 已完成的任务不能成为关键任务。

:::note
样例：[在自动调度、关键路径和松弛时间计算中使用进度](https://snippet.dhtmlx.com/ju3km1uy)
:::

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)
- [Critical Path](guides/critical-path.md)

### Change log
- 该属性在 v9.1 中已被废弃
- 在 v8.0 中新增
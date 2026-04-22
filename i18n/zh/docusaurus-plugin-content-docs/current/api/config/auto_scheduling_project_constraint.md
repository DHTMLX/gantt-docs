---
sidebar_label: auto_scheduling_project_constraint
title: auto_scheduling_project_constraint config
description: "定义任务是否应从其父项目继承约束类型"
---

# auto_scheduling_project_constraint

:::info
此功能仅在 PRO 版本中可用。
:::

:::warning
该属性在 v9.1 已被弃用，请改用 [gantt.config.auto_scheduling](api/config/auto_scheduling.md#project_constraint) 的 `project_constraint` 属性。
:::

### Description

@short: 定义任务是否应从其父项目继承约束类型

@signature: auto_scheduling_project_constraint: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_project_constraint = true;
~~~

**默认值：** false

### Related samples
- [从项目起始与约束的自动排程](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

:::note
该配置在 **auto_scheduling** 扩展中定义，因此需要激活 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。有关详细信息，请参阅 [Auto Scheduling](guides/auto-scheduling.md) 文章。
:::

默认情况下，父项目的约束类型不会影响其嵌套任务的约束类型。

如果将配置设置为 *true*，则子任务（不包括具有自己约束类型的任务）将具有与父项目相同的约束类型（例如，**finish no later than**）。

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [自动排程](guides/auto-scheduling.md)

### Change log
- 该属性在 v9.1 已弃用
- 在 v8.0 新增
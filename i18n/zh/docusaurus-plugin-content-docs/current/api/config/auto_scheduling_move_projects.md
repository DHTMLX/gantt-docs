---
sidebar_label: auto_scheduling_move_projects
title: auto_scheduling_move_projects 配置
description: "定义是否会移动整个项目（请参见下方的详细信息）"
---

# auto_scheduling_move_projects

:::info
本功能仅在 PRO 版中可用。
:::

:::warning
该属性在 v9.1 版本中已废弃，请改用 [gantt.config.auto_scheduling](api/config/auto_scheduling.md#move_projects) 的 `move_projects` 属性。
:::

### Description

@short: 定义是否会移动整个项目（请参见下方的详细信息）

@signature: auto_scheduling_move_projects: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_move_projects = true;

gantt.init("gantt_here");
~~~

**默认值：** true

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
此配置在 **auto_scheduling** 扩展中定义，因此需要启用 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。请在 [Auto Scheduling](guides/auto-scheduling.md) 文章中阅读更多细节。 
:::

默认情况下（属性设置为 *true* 时），在自动调度期间将移动整个项目。这意味着项目中的所有任务相对于彼此以及项目的起始位置仍然保持在原位。

![moving_project_true](/img/moving_project_true.png)

如果将 *auto_scheduling_move_projects* 设置为 *false*，自动调度将移动项目内部的单独任务。因此，一些任务会被移动，其他任务将保持在原位。

![moving_project_false](/img/moving_project_false.png)

:::note
如果使用约束调度（*gantt.config.auto_scheduling_compatibility = false*），*auto_scheduling_move_projects* 配置将只有在禁用严格模式时才会生效：
:::

~~~js
gantt.config.auto_scheduling_compatibility = false;
gantt.config.auto_scheduling_strict = false;
~~~

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
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
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- 该属性在 v9.1 中已被弃用
- 在版本 4.1 中新增
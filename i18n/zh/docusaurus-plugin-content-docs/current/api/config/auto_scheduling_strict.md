---
sidebar_label: auto_scheduling_strict
title: auto_scheduling_strict config
description: "开启自动调度模式，每次任务都会重新安排到最早的可能日期"
---

# auto_scheduling_strict

:::info
此功能仅在 PRO 版本中可用。
:::

:::warning
属性在 v9.1 中已被弃用，请改用 [gantt.config.auto_scheduling](api/config/auto_scheduling.md#gap_behavior) 的 `gap_behavior` 属性。
:::


### Description

@short: 启用自动排程模式，在该模式下，任务将始终被重新排程到最早可用日期

@signature: auto_scheduling_strict: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_strict = true;

gantt.init("gantt_here");
~~~

**默认值：** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
此配置在 **auto_scheduling** 扩展中定义，因此您需要激活 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。请在 [Auto Scheduling](guides/auto-scheduling.md) 文章中阅读详细信息。

请注意，在版本 6.1.0 - 7.1.3 中，只有在启用 [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) 选项时，此配置才起作用。 
:::

默认情况下，当新日期违反约束时，任务才会重新排程。

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
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
---
sidebar_label: auto_scheduling_initial
title: auto_scheduling_initial 配置
description: "定义 gantt 在数据加载/解析时是否执行自动排程"
---

# auto_scheduling_initial

:::info
本功能仅在 PRO 版中可用。
:::

:::warning
该属性在 v9.1 版本中已废弃，请改用 [gantt.config.auto_scheduling](api/config/auto_scheduling.md#schedule_on_parse) 的 `schedule_on_parse` 属性。
:::

### Description

@short: 定义 gantt 在数据加载/解析时是否执行自动排程

@signature: auto_scheduling_initial: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_initial = false;

gantt.init("gantt_here");
~~~

**默认值：** true


### Related samples
- [自动排程扩展](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
此配置在 **auto_scheduling** 扩展中定义，因此需要激活 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。请参阅 [Auto Scheduling](guides/auto-scheduling.md) 文章了解详细信息。
:::

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
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
- [自动排程](guides/auto-scheduling.md)

### Change log
- 该属性在 v9.1 版本中已废弃
- 自版本 4.0 起新增
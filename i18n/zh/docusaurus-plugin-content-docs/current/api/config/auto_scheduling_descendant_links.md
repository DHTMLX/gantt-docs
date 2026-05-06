---
sidebar_label: auto_scheduling_descendant_links
title: auto_scheduling_descendant_links 配置
description: "允许或禁止从父任务（项目）向其子任务创建链接"
---

# auto_scheduling_descendant_links

:::info
此功能仅在 PRO 版本中可用。
:::

:::warning
属性在 v9.1 中已被弃用，请改用 [gantt.config.auto_scheduling](api/config/auto_scheduling.md#descendant_links) 的 `descendant_links` 属性。
:::

### Description

@short: 允许或禁止从父任务（项目）向其子任务创建链接

@signature: auto_scheduling_descendant_links: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_descendant_links = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
此配置在 **auto_scheduling** 扩展中定义，因此需要激活 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。请在 [Auto Scheduling](guides/auto-scheduling.md) 文章中阅读详情。 
:::

默认情况下，无法从父任务（项目）向其子任务创建链接。

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
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
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- 该属性在 v9.1 中已废弃
- 于 4.0 版本中新增
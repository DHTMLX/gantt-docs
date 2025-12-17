---
sidebar_label: auto_scheduling_project_constraint
title: auto_scheduling_project_constraint config
description: "控制任务是否继承其父项目的约束类型"
---

# auto_scheduling_project_constraint
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 控制任务是否继承其父项目的约束类型

@signature: auto_scheduling_project_constraint: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_project_constraint = true;
~~~

**Default value:** false

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

:::note
 此配置属于 **auto_scheduling** 扩展的一部分，因此请确保启用了 [auto_scheduling](guides/extensions-list.md) 插件。更多信息请参见 [自动调度](guides/auto-scheduling.md) 文章。 
:::

默认情况下，分配给父项目的约束类型不会影响其子任务的约束类型。

当此选项设置为 *true* 时，子任务（除非它们自身已指定约束类型）将继承其父项目的约束类型，例如 **finish no later than**。

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
- [自动调度](guides/auto-scheduling.md)

### Change log
- v8.0中新增


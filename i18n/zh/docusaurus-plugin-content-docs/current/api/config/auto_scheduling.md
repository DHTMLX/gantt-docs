---
sidebar_label: auto_scheduling
title: auto_scheduling config
description: "启用自动排程"
---

# auto_scheduling
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 启用自动排程

@signature: auto_scheduling: boolean | AutoSchedulingConfig

### Example

~~~jsx
gantt.config.auto_scheduling = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 此设置属于 **auto_scheduling** 扩展的一部分，因此请确保启用 [auto_scheduling](guides/extensions-list.md) 插件。更多详情请参见 [自动调度](guides/auto-scheduling.md) 文章。 
:::


`auto_scheduling` 选项可以是布尔值，也可以是对象，后者提供了更详细的自动排程控制。当使用对象时，可以配置以下内容:

- **enabled** - (*boolean*) - 用于开启或关闭自动排程，功能等同于直接设置布尔值。
- **show_constraints?** - (*boolean*) - 控制是否在甘特图中显示任务约束。
设置为 `true` 显示约束，设置为 `false` 则隐藏。

例如，开启自动排程但保持任务约束隐藏:

~~~js
gantt.config.auto_scheduling = {
  enabled: true,
  show_constraints: false
};
gantt.init("gantt_here");
~~~

### Related API
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
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
- [自动调度](guides/auto-scheduling.md)

### Change log
- 自版本 9.0 起，此配置支持定义为对象


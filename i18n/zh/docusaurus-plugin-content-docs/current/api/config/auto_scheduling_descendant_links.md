---
sidebar_label: auto_scheduling_descendant_links
title: auto_scheduling_descendant_links config
description: "控制是否允许从父任务（项目）创建到其子任务的链接"
---

# auto_scheduling_descendant_links
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 控制是否允许从父任务（项目）创建到其子任务的链接

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
 此设置是 **auto_scheduling** 扩展的一部分，因此请确保启用 [auto_scheduling](guides/extensions-list.md) 插件。更多详情请参阅 [自动调度](guides/auto-scheduling.md) 文章。 
:::


默认情况下，不允许从父任务（项目）创建到其子任务的链接。

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
- [自动调度](guides/auto-scheduling.md)

### Change log
- 在版本 4.0 中新增


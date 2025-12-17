---
sidebar_label: auto_scheduling_strict
title: auto_scheduling_strict config
description: "开启自动调度模式，每次任务都会重新安排到最早的可能日期"
---

# auto_scheduling_strict
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 开启自动调度模式，每次任务都会重新安排到最早的可能日期

@signature: auto_scheduling_strict: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_strict = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 此设置属于**auto_scheduling**扩展的一部分，因此请确保已激活[auto_scheduling](guides/extensions-list.md)插件。更多信息请参见[自动调度](guides/auto-scheduling.md)文档。<br>

请注意，对于6.1.0到7.1.3版本，只有启用了[auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md)选项，此配置才会生效。 
:::

通常情况下，只有当新日期违反约束时，任务才会被重新调度。

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
- [自动调度](guides/auto-scheduling.md)


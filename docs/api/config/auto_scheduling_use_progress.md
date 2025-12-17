---
sidebar_label: auto_scheduling_use_progress
title: auto_scheduling_use_progress config
description: "sets the way the scheduling algorithms process completed tasks"
---

# auto_scheduling_use_progress

:::info
This functionality is available in the PRO edition only. 
:::

:::warning
The property has been deprecated in v9.1, use the `use_progress` property of [gantt.config.auto_scheduling](api/config/auto_scheduling.md#use_progress) instead.
:::

### Description

@short: Sets the way the scheduling algorithms process completed tasks

@signature: auto_scheduling_use_progress: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_use_progress = true;

gantt.init("gantt_here");
~~~

**Default value:** false


### Details

:::note
This config is defined either in the **auto_scheduling** or **critical_path** extension, so you need to activate either the [auto_scheduling](guides/extensions-list.md#autoscheduling) or [critical_path](guides/extensions-list.md#critical-path) plugin. Read the details in the [Auto Scheduling](guides/auto-scheduling.md) and [Critical Path](guides/critical-path.md) articles. 
:::

When the property is enabled, the critical path, slack, and auto scheduling algorithms will take the value of the task progress into account, similar to how these methods work in MS Project, namely:

1) Completed tasks (completed tasks - the tasks with 100% progress) always have zero slack;

2) Completed tasks are excluded from the auto scheduling calculations. Relations that connect predecessors to completed tasks are ignored;

3) Completed tasks can't be critical.

:::note
sample: [Use progress for auto-scheduling, critical path and slack calculations](https://snippet.dhtmlx.com/ju3km1uy )
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
- the property has been deprecated in v9.1
- added in v8.0


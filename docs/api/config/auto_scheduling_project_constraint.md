---
sidebar_label: auto_scheduling_project_constraint
title: auto_scheduling_project_constraint config
description: "defines whether tasks should inherit the constraint type from their parent project"
---

# auto_scheduling_project_constraint

:::info
This functionality is available in the PRO edition only. 
:::

:::warning
The property has been deprecated in v9.1, use the `project_constraint` property of [gantt.config.auto_scheduling](api/config/auto_scheduling.md#project_constraint) instead.
:::

### Description

@short: Defines whether tasks should inherit the constraint type from their parent project

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
This config is defined in the **auto_scheduling** extension, so you need to activate the [auto_scheduling](guides/extensions-list.md#autoscheduling) plugin. Read the details in the [Auto Scheduling](guides/auto-scheduling.md) article. 
:::

By default, the constraint type of the parent project doesn't affect the constraint type of its nested tasks.

If you set the config to *true*, the child tasks (except for tasks with their own constraint type) will have the same constraint type as their parent project (for example, **finish no later than**).

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
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- the property has been deprecated in v9.1
- added in v8.0


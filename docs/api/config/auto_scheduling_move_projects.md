---
sidebar_label: auto_scheduling_move_projects
title: auto_scheduling_move_projects config
description: "defines whether the whole project will be moved (see the details below)"
---

# auto_scheduling_move_projects

:::info
This functionality is available in the PRO edition only. 
:::

:::warning
The property has been deprecated in v9.1, use the `move_projects` property of [gantt.config.auto_scheduling](api/config/auto_scheduling.md#move_projects) instead.
:::

### Description

@short: Defines whether the whole project will be moved (see the details below)

@signature: auto_scheduling_move_projects: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_move_projects = true;

gantt.init("gantt_here");
~~~

**Default value:** true


### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
This config is defined in the **auto_scheduling** extension, so you need to activate the [auto_scheduling](guides/extensions-list.md#autoscheduling) plugin. Read the details in the [Auto Scheduling](guides/auto-scheduling.md) article. 
:::

By default (when the property is set to *true*), the whole project is moved during auto scheduling. It means that all tasks in the project remain on their places
relative to each other and the beginning of the project.

![moving_project_true](/img/moving_project_true.png)

If the *auto_scheduling_move_projects* is set to *false*, auto scheduling will move separate tasks inside of the project. Thus, some tasks will be moved, others will
remain on their places.

![moving_project_false](/img/moving_project_false.png)

:::note
if you use constraint scheduling (*gantt.config.auto_scheduling_compatibility = false*), the *auto_scheduling_move_projects* config will be active only when the strict mode is disabled:
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
- the property has been deprecated in v9.1
- added in version 4.1


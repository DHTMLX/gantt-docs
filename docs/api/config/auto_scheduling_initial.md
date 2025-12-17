---
sidebar_label: auto_scheduling_initial
title: auto_scheduling_initial config
description: "defines whether gantt will do autoscheduling on data loading/parsing"
---

# auto_scheduling_initial

:::info
This functionality is available in the PRO edition only. 
:::

:::warning
The property has been deprecated in v9.1, use the `schedule_on_parse` property of [gantt.config.auto_scheduling](api/config/auto_scheduling.md#schedule_on_parse) instead.
:::

### Description

@short: Defines whether gantt will do autoscheduling on data loading/parsing

@signature: auto_scheduling_initial: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_initial = false;

gantt.init("gantt_here");
~~~

**Default value:** true


### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
This config is defined in the **auto_scheduling** extension, so you need to activate the [auto_scheduling](guides/extensions-list.md#autoscheduling) plugin. Read the details in the [Auto Scheduling](guides/auto-scheduling.md) article. 
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
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- the property has been deprecated in v9.1
- added in version 4.0


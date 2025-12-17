---
sidebar_label: isCircularLink
title: isCircularLink method
description: "checks whether the link is circular"
---

# isCircularLink

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Checks whether the link is circular

@signature: isCircularLink: (link: Link) =\> boolean

### Parameters

- `link` - (required) *Link* - the link object

### Returns
- ` state` - (boolean) - true, if the link is circular, otherwise false

### Example

~~~jsx
var isCircular = gantt.isCircularLink(link);
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
The method requires the [auto_scheduling](guides/extensions-list.md#autoscheduling) plugin to be activated. 
:::

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [findCycles](api/method/findcycles.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- added in version 4.1


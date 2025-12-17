---
sidebar_label: onCircularLinkError
title: onCircularLinkError event
description: "fires when the circular reference has been detected and auto scheduling is not possible"
---

# onCircularLinkError
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Fires when the circular reference has been detected and auto scheduling is not possible

@signature: onCircularLinkError: (link: Link, group: any) =\> void;

### Parameters

- `link` - (required) *Link* - the link object
- `group` - (required) *object* - a group of tasks and links connected in a loop

### Example

~~~jsx
gantt.attachEvent("onCircularLinkError",function(link, group){
    // any custom logic here
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

The **group** parameter presents an object which includes a group of tasks and links connected in a loop.

~~~js
{ 
    tasks: [//ids of tasks connected in a loop], 
    links: [//ids of links connected in a loop]
}
~~~

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
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- The **group** parameter is added in version 4.1.


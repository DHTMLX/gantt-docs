---
sidebar_label: onAutoScheduleCircularLink
title: onAutoScheduleCircularLink event
description: "fires if some dependency loops were found during auto scheduling"
---

# onAutoScheduleCircularLink
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Fires if some dependency loops were found during auto scheduling

@signature: onAutoScheduleCircularLink: (groups: any[]) =\> void;

### Parameters

- `groups` - (required) *array* - an array of dependency loops found in gantt

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleCircularLink",function(groups){
    // any custom logic here
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
The method requires the [auto_scheduling](guides/extensions-list.md#autoscheduling) plugin to be activated. 
:::

Tasks aren't modified when this event fires. 

The *groups* parameter presents an array of dependency loops found in gantt. 
Each element of the array is a group of tasks and links which make a loop.

~~~js
[ 
    { 
        tasks: [//ids of tasks connected in a loop], 
        links: [//ids of links connected in a loop]
    },
    {
        
        tasks: [...], 
        links: [...]
    }
]
~~~

Have a look at the example below:

- The Task #3 has the id = 10
- The Task #4.1 has the id = 12
- The Link from the end of Task #3 to the start of Task #4 has the id = 1
- The Link from the end of Task #4.1 to the start of Task #3 has the id = 2

The *groups* parameter will contain the following group object:

~~~js
[ 
    { 
        tasks: ["10", "12"], 
        links: ["1", "2"]
    }
]
~~~

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
- [onCircularLinkError](api/event/oncircularlinkerror.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- added in version 4.1


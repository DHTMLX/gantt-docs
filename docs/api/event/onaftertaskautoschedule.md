---
sidebar_label: onAfterTaskAutoSchedule
title: onAfterTaskAutoSchedule event
description: "fires for each task which has been autoscheduled"
---

# onAfterTaskAutoSchedule
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Fires for each task which has been autoscheduled

@signature: onAfterTaskAutoSchedule: (task: Task, start: Date, link: Link, predecessor: Task) =\> void;

### Parameters

- `task` - (required) *Task* - the task object
- `start` - (required) *Date* - a new start date
- `link` - (required) *Link* - the link object that creates the constraint 
- `predecessor` - (required) *Task* - the predecessor task object

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAutoSchedule",function(task, start, link, predecessor){
    // any custom logic here
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
This event is defined in the **auto_scheduling** extension, so you need to activate the [auto_scheduling](guides/extensions-list.md#autoscheduling) plugin. Read the details in the [Auto Scheduling](guides/auto-scheduling.md) article. 
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
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)


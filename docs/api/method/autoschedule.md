---
sidebar_label: autoSchedule
title: autoSchedule method
description: "recalculates the schedule of the project"
---

# autoSchedule

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Recalculates the schedule of the project

@signature: autoSchedule: (taskId?: string | number) =\> void

### Parameters
- `taskId` - (optional) *string | number* - the task id

### Example

~~~jsx
gantt.autoSchedule();
~~~

### Details

To recalculate the schedule for a group of linked tasks, pass the id of one of the tasks in this group as an argument to the **autoSchedule()** method:

~~~js
gantt.autoSchedule(taskId);
~~~

:::note
The method requires the [auto_scheduling](guides/extensions-list.md#autoscheduling) plugin to be included on the page. 
:::

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

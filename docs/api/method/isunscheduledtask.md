---
sidebar_label: isUnscheduledTask
title: isUnscheduledTask method
description: "checks if the task is unscheduled"
---

# isUnscheduledTask

### Description

@short: Checks if the task is unscheduled

@signature: isUnscheduledTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - the task's object

### Returns
- ` value` - (boolean) - 'true' if the specified task is unscheduled, 'false' otherwise

### Example

~~~jsx
var isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Related Guides
- [Unscheduled Tasks](guides/unscheduled-tasks.md)
- [Auto Scheduling](guides/auto-scheduling.md)

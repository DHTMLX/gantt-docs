---
sidebar_label: isSummaryTask
title: isSummaryTask method
description: "checks whether the specified task is summary"
---

# isSummaryTask

:::info
The method works only in the PRO version, since the possibility to specify the type of a task is available in that version only. Otherwise, the method will return false.
:::

### Description

@short: Checks whether the specified task is summary

@signature: isSummaryTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - the object of a task

### Returns
- ` mode` - (boolean) - <i>true</i>, if the task is summary. Otherwise, <i>false</i>

### Example

~~~jsx
const task = gantt.getTask(10);
gantt.isSummaryTask(task); // ->false
~~~

### Related Guides
- [Task Types](guides/task-types.md)

---
sidebar_label: isSplitTask
title: isSplitTask method
description: "checks whether the specified task is split"
---

# isSplitTask

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Checks whether the specified task is split

@signature: isSplitTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - the object of a task

### Returns
- ` isSplit` - (boolean) - true, if the task is split, false otherwise

### Example

~~~jsx
const task = gantt.getTask(13);
// --> { id: 13, render:"split", text: "Task #2", ...}

if(gantt.isSplitTask(task)){
  // do something
}
~~~

### Related Guides
- [Split Tasks](guides/split-tasks.md)

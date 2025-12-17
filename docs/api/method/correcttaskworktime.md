---
sidebar_label: correctTaskWorkTime
title: correctTaskWorkTime method
description: "recalculates the task duration in the work time"
---

# correctTaskWorkTime

### Description

@short: Recalculates the task duration in the work time

@signature: correctTaskWorkTime: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - the task's object

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    gantt.correctTaskWorkTime(task);
});
~~~

### Details

The method requires the following configuration options to be specified:

~~~js
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
~~~

### Related Guides
- [Work Time Calculation](guides/working-time.md)

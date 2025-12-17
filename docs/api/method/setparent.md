---
sidebar_label: setParent
title: setParent method
description: "set the parent for a task"
---

# setParent

### Description

@short: Set the parent for a task

@signature: setParent: (task: Task, pid: number | string) =\> void

### Parameters

- `task` - (required) *Task* - the task object
- `pid` - (required) *number | string* -                the parent task id

### Example

~~~jsx
gantt.setParent(gantt.getTask(2), 20);
gantt.updateTask(2);
~~~

---
sidebar_label: setParent
title: setParent method
description: "为任务分配一个父任务"
---

# setParent

### Description

@short: 为任务分配一个父任务

@signature: setParent: (task: Task, pid: number | string) =\> void

### Parameters

- `task` - (required) *Task* - 任务对象
- `pid` - (required) *number | string* -                父任务的ID

### Example

~~~jsx
gantt.setParent(gantt.getTask(2), 20);
gantt.updateTask(2);
~~~

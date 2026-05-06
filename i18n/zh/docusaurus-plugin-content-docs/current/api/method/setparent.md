---
sidebar_label: setParent
title: setParent 方法
description: "为任务设置父任务"
---

# setParent

### Description

@short: 为任务设置父任务

@signature: setParent: (task: Task, pid: number | string) =\> void

### Parameters

- `task` - (required) *Task* - 任务对象
- `pid` - (required) *number | string* - 父任务 ID

### Example

~~~jsx
gantt.setParent(gantt.getTask(2), 20);
gantt.updateTask(2);
~~~
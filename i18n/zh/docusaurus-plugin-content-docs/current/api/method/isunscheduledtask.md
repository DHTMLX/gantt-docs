---
sidebar_label: isUnscheduledTask
title: isUnscheduledTask 方法
description: "检查任务是否未排程"
---

# isUnscheduledTask

### Description

@short: 检查任务是否未排程

@signature: isUnscheduledTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` value` - (boolean) - 如果指定的任务未排程，则为 'true'，否则为 'false'

### Example

~~~jsx
var isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Related Guides
- [未排程的任务](guides/unscheduled-tasks.md)
- [自动排程](guides/auto-scheduling.md)
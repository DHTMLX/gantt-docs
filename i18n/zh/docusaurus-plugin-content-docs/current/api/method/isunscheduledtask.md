---
sidebar_label: isUnscheduledTask
title: isUnscheduledTask method
description: "验证任务是否为未计划任务"
---

# isUnscheduledTask

### Description

@short: 验证任务是否为未计划任务

@signature: isUnscheduledTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - 要检查的任务对象

### Returns
- ` value` - (boolean) - 如果任务是未计划任务则返回 'true'，否则返回 'false'

### Example

~~~jsx
var isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Related Guides
- [未计划任务](guides/unscheduled-tasks.md)
- [自动调度](guides/auto-scheduling.md)

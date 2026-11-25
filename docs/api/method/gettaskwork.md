---
sidebar_label: getTaskWork
title: getTaskWork method
description: "Returns the amount of work for a task."
---

# getTaskWork

### Description

@short: Returns a task's work in the configured effort work unit

@signature: getTaskWork: (taskId: string | number) =\> number;

### Parameters

- `taskId` is the ID of an existing task.

### Returns

The amount of work in the [configured work unit](api/config/effort.md). When effort calculations are enabled, a summary task returns the total work of its children. For other tasks, the method returns stored work if available. When there is no stored value, Gantt derives work from the task dates and allocations if effort calculations are enabled, or returns `0` if they are disabled.

### Example

~~~js
const work = gantt.getTaskWork(1);
~~~

### Related API

- [effort](api/config/effort.md)
- [task_work](api/template/task_work.md)

### Related guides

- [Effort-Driven Tasks](guides/effort-driven-tasks.md)

### Change log

- Added in v10.1.

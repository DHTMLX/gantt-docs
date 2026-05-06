---
sidebar_label: isUnscheduledTask
title: isUnscheduledTask method
description: "проверяет, является ли задача незапланированной"
---

# isUnscheduledTask

### Description

@short: Проверяет, является ли задача незапланированной

@signature: isUnscheduledTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` value` - (boolean) - 'true' если указанная задача незапланирована, 'false' в противном случае

### Example

~~~jsx
var isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Related Guides
- [Незапланированные задачи](guides/unscheduled-tasks.md)
- [Автоматическое планирование](guides/auto-scheduling.md)
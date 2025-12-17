---
sidebar_label: isUnscheduledTask
title: isUnscheduledTask method
description: "проверяет, является ли задача несогласованной (unscheduled)"
---

# isUnscheduledTask

### Description

@short: Проверяет, является ли задача несогласованной (unscheduled)

@signature: isUnscheduledTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - объект задачи для проверки

### Returns
- ` value` - (boolean) - возвращает 'true', если задача несогласованная, иначе 'false'

### Example

~~~jsx
var isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Related Guides
- [Незапланированные задачи](guides/unscheduled-tasks.md)
- [Автоматическое планирование](guides/auto-scheduling.md)

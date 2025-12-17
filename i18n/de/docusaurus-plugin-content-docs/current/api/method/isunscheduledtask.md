---
sidebar_label: isUnscheduledTask
title: isUnscheduledTask method
description: "prüft, ob die Aufgabe unscheduled ist"
---

# isUnscheduledTask

### Description

@short: Prüft, ob die Aufgabe unscheduled ist

@signature: isUnscheduledTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - das zu überprüfende Task-Objekt

### Returns
- ` value` - (boolean) - gibt 'true' zurück, wenn die Aufgabe unscheduled ist, andernfalls 'false'

### Example

~~~jsx
var isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Related Guides
- ["Nicht terminierte Aufgaben"](guides/unscheduled-tasks.md)
- ["Auto Scheduling"](guides/auto-scheduling.md)

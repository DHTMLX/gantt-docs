---
sidebar_label: isUnscheduledTask
title: isUnscheduledTask Methode
description: "prüft, ob die Aufgabe ungeplant ist"
---

# isUnscheduledTask

### Description

@short: Prüft, ob die Aufgabe ungeplant ist

@signature: isUnscheduledTask: (task: Task) => boolean

### Parameters

- `task` - (erforderlich) *Task* - das Objekt der Aufgabe

### Returns
- `Wert` - (boolean) - 'true', wenn die angegebene Aufgabe ungeplant ist, 'false' ansonsten

### Example

~~~jsx
var isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Related Guides
- [ungeplante Aufgaben](guides/unscheduled-tasks.md)
- [Automatische Planung](guides/auto-scheduling.md)
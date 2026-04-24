---
sidebar_label: setParent
title: setParent Methode
description: "Den Elternteil für eine Aufgabe festlegen"
---

# setParent

### Description

@short: Den Elternteil für eine Aufgabe festlegen

@signature: setParent: (task: Task, pid: number | string) =\> void

### Parameters

- `task` - (erforderlich) *Task* - das Task-Objekt
- `pid` - (erforderlich) *number | string* - die ID der übergeordneten Aufgabe

### Example

~~~jsx
gantt.setParent(gantt.getTask(2), 20);
gantt.updateTask(2);
~~~
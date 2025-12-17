---
sidebar_label: setParent
title: setParent method
description: "einem Task einen Parent zuweisen"
---

# setParent

### Description

@short: Einem Task einen Parent zuweisen

@signature: setParent: (task: Task, pid: number | string) =\> void

### Parameters

- `task` - (required) *Task* - das Task-Objekt
- `pid` - (required) *number | string* -    die ID des Parent-Tasks

### Example

~~~jsx
gantt.setParent(gantt.getTask(2), 20);
gantt.updateTask(2);
~~~

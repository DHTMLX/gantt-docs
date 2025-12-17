---
sidebar_label: setParent
title: setParent method
description: "назначить родительскую задачу для задачи"
---

# setParent

### Description

@short: Назначить родительскую задачу для задачи

@signature: setParent: (task: Task, pid: number | string) =\> void

### Parameters

- `task` - (required) *Task* - объект задачи
- `pid` - (required) *number | string* -                id родительской задачи

### Example

~~~jsx
gantt.setParent(gantt.getTask(2), 20);
gantt.updateTask(2);
~~~

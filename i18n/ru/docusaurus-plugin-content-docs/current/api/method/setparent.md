---
sidebar_label: setParent
title: setParent method
description: "Назначение родителя для задачи"
---

# setParent

### Description

@short: Установить родителя для задачи

@signature: setParent: (task: Task, pid: number | string) => void

### Parameters

- `task` - (обязательно) *Task* - объект задачи
- `pid` - (обязательно) *number | string* - идентификатор родительской задачи

### Example

~~~jsx
gantt.setParent(gantt.getTask(2), 20);
gantt.updateTask(2);
~~~
---
sidebar_label: resetProjectDates
title: resetProjectDates method
description: "пересчитывает длительность задачи проекта в зависимости от дат её дочерних задач"
---

# resetProjectDates
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Пересчитывает длительность задачи проекта в зависимости от дат её дочерних задач

@signature: resetProjectDates: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - объект задачи

### Example

~~~jsx
gantt.resetProjectDates(gantt.getTask(3));
~~~

### Details


Этот метод обновляет свойства **start_date**, **end_date** и **duration** переданного объекта задачи на основе дат его дочерних задач.

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)


---
sidebar_label: resetProjectDates
title: Метод resetProjectDates
description: "пересчитывает продолжительность задачи проекта в зависимости от дат её подзадач"
---

# resetProjectDates

:::info
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Перерасчитывает продолжительность задачи проекта в зависимости от дат её подзадач

@signature: resetProjectDates: (task: Task) =\> void

### Parameters

- `task` - (обязательно) *Task* - объект задачи

### Example

~~~jsx
gantt.resetProjectDates(gantt.getTask(3));
~~~

### Details

Метод модифицирует свойства **start_date**, **end_date** и **duration** предоставленного объекта.

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)
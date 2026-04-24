---
sidebar_label: task_class
title: task_class шаблон
description: "определяет CSS-класс, который будет применяться к полосам задач"
---

# task_class

### Description

@short: CSS-класс, который будет применяться к полосам задач

@signature: task_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (обязательно) *Date* - дата начала запланированной задачи
- `end` - (обязательно) *Date* - дата окончания запланированной задачи
- `task` - (обязательно) *Task* - объект задачи

### Returns
- ` text` - (string | void) - CSS класс, который будет назначен элементу

### Example

~~~jsx
gantt.templates.task_class = function(start, end, task){return "";};
~~~

### Related Guides
- [Шаблоны области временной шкалы](guides/timeline-templates.md)

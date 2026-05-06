---
sidebar_label: task_row_class
title: task_row_class шаблон
description: "задает CSS-класс, который будет применяться к строке области временной шкалы"
---

# task_row_class

### Description

@short: Указывает CSS-класс, который будет применяться к строке области временной шкалы

@signature: task_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - дата начала запланированной задачи  
- `end` - (required) *Date* - дата завершения задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | void) - CSS-класс для указанного элемента

### Example

~~~jsx
gantt.templates.task_row_class = function(start, end, task){
    return "";
};
~~~

### Details

Возвращает CSS-класс для указанного элемента.

### Related Guides
- [Шаблоны области временной шкалы](guides/timeline-templates.md)
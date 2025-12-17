---
sidebar_label: task_row_class
title: task_row_class template
description: "устанавливает CSS класс, который применяется к строке в области timeline"
---

# task_row_class

### Description

@short: Устанавливает CSS класс, который применяется к строке в области timeline

@signature: task_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - дата начала задачи  
- `end` - (required) *Date* - дата окончания задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | void) - CSS класс для обрабатываемого элемента

### Example

~~~jsx
gantt.templates.task_row_class = function(start, end, task){
    return "";
};
~~~

### Details

Обеспечивает CSS класс для указанного элемента.

### Related Guides
- [Шаблоны области временной шкалы](guides/timeline-templates.md)

---
sidebar_label: task_text
title: task_text шаблон
description: "указывается текст в полосах задач и заголовке lightbox"
---

# task_text

### Description

@short: Указывает текст в полосах задач и заголовке lightbox

@signature: task_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - дата начала запланированной задачи
- `end` - (required) *Date* - дата завершения запланированной задачи
- `task` - (required) *Task* - объект задачи

### Returns
- `text` - (string | number | void) - HTML-текст, который будет отрисован на диаграмме Ганта

### Example

~~~jsx
gantt.templates.task_text=function(start, end, task){
    return task.text;
};
~~~

### Related Guides
- [Шаблоны области временной шкалы](guides/timeline-templates.md)
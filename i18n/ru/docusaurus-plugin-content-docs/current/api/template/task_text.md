---
sidebar_label: task_text
title: task_text template
description: "задаёт текст, отображаемый в task bars и в заголовке lightbox"
---

# task_text

### Description

@short: Задаёт текст, отображаемый в task bars и в заголовке lightbox

@signature: task_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - дата, когда планируется начало задачи  
- `end` - (required) *Date* - дата, к которой ожидается завершение задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | number | void) - HTML содержимое, которое будет показано внутри gantt

### Example

~~~jsx
gantt.templates.task_text=function(start, end, task){
    return task.text;
};
~~~

### Related Guides
- [Шаблоны области временной шкалы](guides/timeline-templates.md)

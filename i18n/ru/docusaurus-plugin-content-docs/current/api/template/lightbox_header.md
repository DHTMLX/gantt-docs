---
sidebar_label: lightbox_header
title: lightbox_header template
description: "задаёт header для lightbox"
---

# lightbox_header

### Description

@short: Задаёт header для lightbox

@signature: lightbox_header: (start_date: Date, end_date: Date, task: Task) =\> string;

### Parameters

- `start_date` - (required) *Date* - дата начала запланированной задачи  
- `end_date` - (required) *Date* - дата завершения запланированной задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string) - HTML-текст для отображения в gantt

### Example

~~~jsx
gantt.templates.lightbox_header = function(start_date,end_date,task){
    return gantt.templates.task_time(task.start_date, task.end_date, task)  +  "&nbsp;" +
    (gantt.templates.task_text(task.start_date, task.end_date, task) || "").substr(0, 70);
};
~~~

### Related Guides
- [Шаблоны Lightbox](guides/lightbox-templates.md)

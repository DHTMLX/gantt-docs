---
sidebar_label: lightbox_header
title: lightbox_header шаблон
description: "задает заголовок lightbox"
---

# lightbox_header

### Description

@short: Задает заголовок lightbox

@signature: lightbox_header: (start_date: Date, end_date: Date, task: Task) =\> string;

### Parameters

- `start_date` - (обязательно) *Date* - дата начала выполнения задачи
- `end_date` - (обязательно) *Date* - дата, к которой задача должна быть завершена
- `task` - (обязательно) *Task* - объект задачи

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
- [Шаблоны лайтбокса](guides/lightbox-templates.md)
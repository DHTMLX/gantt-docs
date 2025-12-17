---
sidebar_label: task_time
title: task_time template
description: "определяет диапазон дат, отображаемый в заголовке lightbox"
---

# task_time

### Description

@short: Определяет диапазон дат, отображаемый в заголовке lightbox

@signature: task_time: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - дата начала задачи  
- `end` - (required) *Date* - дата, когда ожидается завершение задачи
- `task` - (required) *Task* - объект самой задачи

### Returns
- ` text` - (string) - html-контент, который будет отображаться в gantt

### Example

~~~jsx
gantt.templates.task_time = function(start,end,task){
    return gantt.templates.task_date(start)+" - "+gantt.templates.task_end_date(end);
};
~~~

### Related API
- [task_date](api/template/task_date.md)
- [task_end_date](api/template/task_end_date.md)

### Related Guides
- [Шаблоны Lightbox](guides/lightbox-templates.md)


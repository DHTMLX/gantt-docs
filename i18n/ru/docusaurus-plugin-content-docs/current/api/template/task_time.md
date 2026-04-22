---
sidebar_label: task_time
title: task_time шаблон
description: "задает диапазон дат в заголовке lightbox"
---

# task_time

### Description
@short: Задает диапазон дат в заголовке lightbox

@signature: task_time: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - дата начала запланированной задачи
- `end` - (required) *Date* - дата окончания запланированной задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string) - HTML текст, который будет отображаться в диаграмме Ганта

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
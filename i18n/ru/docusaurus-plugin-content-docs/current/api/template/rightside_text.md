---
sidebar_label: rightside_text
title: rightside_text шаблон
description: "задает текст, присваиваемый полоскам задач на правой стороне"
---

# rightside_text

### Description

@short: Задает текст, присваиваемый полоскам задач на правой стороне

@signature: rightside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - дата начала запланированной задачи
- `end` - (required) *Date* - дата окончания запланированной задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | number | void) - HTML-текст, который будет отрисован в gantt

### Example

~~~jsx
gantt.templates.rightside_text = function(start, end, task){
    return "ID: #" + task.id;
};
~~~

### Related samples
- [Определение бокового содержимого](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [leftside_text](api/template/leftside_text.md)

### Related Guides
- [Шаблоны области таймлайна](guides/timeline-templates.md)
- [Отображение содержимого задач](guides/text-block-for-task.md)
---
sidebar_label: rightside_text
title: rightside_text template
description: "определяет текст, который отображается с правой стороны на полосах задач"
---

# rightside_text

### Description

@short: Определяет текст, который отображается с правой стороны на полосах задач

@signature: rightside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - дата начала задачи
- `end` - (required) *Date* - дата планового завершения задачи
- `task` - (required) *Task* - сам объект задачи

### Returns
- ` text` - (string | number | void) - HTML-строка, которая будет отображаться в gantt

### Example

~~~jsx
gantt.templates.rightside_text = function(start, end, task){
    return "ID: #" + task.id;
};
~~~

### Related samples
- [Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [leftside_text](api/template/leftside_text.md)

### Related Guides
- [Шаблоны области временной шкалы](guides/timeline-templates.md)
- [Отображение содержимого задач](guides/text-block-for-task.md)


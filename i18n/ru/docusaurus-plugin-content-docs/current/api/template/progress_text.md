---
sidebar_label: progress_text
title: progress_text template
description: "определяет текст, отображаемый в завершённой части task bar"
---

# progress_text

### Description

@short: Определяет текст, отображаемый в завершённой части task bar

@signature: progress_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - дата, когда планируется начать задачу  
- `end` - (required) *Date* - дата, к которой ожидается завершение задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | number | void) - HTML-текст, который будет отображён внутри gantt

### Example

~~~jsx
gantt.templates.progress_text=function(start, end, task){return "";};
~~~

### Related samples
- [Text in the Progress bar](https://docs.dhtmlx.com/gantt/samples/04_customization/07_progress_text.html)

### Related Guides
- [Шаблоны области временной шкалы](guides/timeline-templates.md)

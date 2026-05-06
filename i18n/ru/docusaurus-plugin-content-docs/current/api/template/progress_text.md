---
sidebar_label: progress_text
title: progress_text шаблон
description: "задает текст в завершенной части панели задач"
---

# progress_text

### Description

@short: Указывает текст в завершенной части панели задач

@signature: progress_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - дата начала запланированной задачи
- `end` - (required) *Date* - дата завершения запланированной задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | number | void) - HTML-текст, который будет отображаться в диаграмме Ганта

### Example

~~~jsx
gantt.templates.progress_text=function(start, end, task){return "";};
~~~

### Связанные примеры
- [Текст в прогресс-баре](https://docs.dhtmlx.com/gantt/samples/04_customization/07_progress_text.html)

### Связанные руководства
- [Шаблоны Timeline Area](guides/timeline-templates.md)
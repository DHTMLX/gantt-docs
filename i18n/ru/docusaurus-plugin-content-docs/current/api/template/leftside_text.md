---
sidebar_label: leftside_text
title: leftside_text template
description: "определяет текст, отображаемый с левой стороны task bars"
---

# leftside_text

### Description

@short: Определяет текст, отображаемый с левой стороны task bars

@signature: leftside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - дата, когда планируется начало задачи
- `end` - (required) *Date* - дата, когда ожидается завершение задачи
- `task` - (required) *Task* - сам объект задачи

### Returns
- ` text` - (string | number | void) - HTML текст, который будет отображён на gantt chart

### Example

~~~jsx
const formatter = gantt.ext.formatters.durationFormatter({
    format: ["day"]
});

gantt.templates.leftside_text = function(start, end, task){
    return formatter.format(task.duration);
};
~~~

### Related samples
- [Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [rightside_text](api/template/rightside_text.md)

### Related Guides
- [Шаблоны области временной шкалы](guides/timeline-templates.md)
- [Отображение содержимого задач](guides/text-block-for-task.md)
- [Расширение Formatters](guides/formatters-ext.md#durationformatter)


---
sidebar_label: leftside_text
title: leftside_text шаблон
description: "указывается текст, присваиваемый полосам задач слева"
---

# leftside_text

### Description

@short: Указывает текст, присваиваемый полосам задач слева

@signature: leftside_text: (start: Date, end: Date, task: Task) => string | number | void;

### Parameters

- `start` - (required) *Date* - дата начала запланированного выполнения задачи
- `end` - (required) *Date* - дата окончания запланированного выполнения задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | number | void) - HTML-текст, который будет отрисован в диаграмме Гантта

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
- [Определение бокового содержимого](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [rightside_text](api/template/rightside_text.md)

### Related Guides
- [Шаблоны области Таймлайна](guides/timeline-templates.md)
- [Отображение содержимого задач](guides/text-block-for-task.md)
- [Расширение форматтеров](guides/formatters-ext.md#durationformatter)
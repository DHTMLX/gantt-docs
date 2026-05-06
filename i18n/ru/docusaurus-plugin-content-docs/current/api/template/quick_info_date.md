---
sidebar_label: quick_info_date
title: Шаблон quick_info_date
description: "задает дату формы редактирования во всплывающем окне"
---

# quick_info_date

### Description

@short: Указывает дату формы редактирования во всплывающем окне

@signature: quick_info_date: (start: Date, end: Date, task: Task) => string;

### Parameters

- `start` - (required) *Date* - дата начала выполнения задачи
- `end` - (required) *Date* - дата завершения задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string) - HTML-текст, который будет отображаться в диаграмме Гантта

### Example

~~~jsx
gantt.templates.quick_info_date = function(start, end, task){
       return gantt.templates.task_time(start, end, task);
};
~~~

### Related samples
- [Расширение QuickInfo](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Этот шаблон определяется в расширении **Quick Info**, поэтому необходимо активировать плагин [quick_info](guides/extensions-list.md#quick-info). 
:::

### Related Guides
- [Шаблоны расширения 'Quick Info' (Touch Support)](guides/touch-templates.md)
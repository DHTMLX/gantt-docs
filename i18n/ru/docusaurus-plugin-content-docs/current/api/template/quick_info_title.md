---
sidebar_label: quick_info_title
title: quick_info_title template
description: "задаёт заголовок всплывающей формы редактирования"
---

# quick_info_title

### Description

@short: Указывает заголовок всплывающей формы редактирования

@signature: quick_info_title: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - дата начала задачи, запланированная к началу выполнения
- `end` - (required) *Date* - дата завершения задачи, запланированная к выполнению
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | number | void) - HTML-текст, который будет отрисован в диаграмме Ганта

### Example

~~~jsx
gantt.templates.quick_info_title = function(start, end, task){ 
       return ev.text.substr(0,50); 
};
~~~

### Related samples
- [Расширение QuickInfo](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Этот шаблон определяется в расширении **Quick Info**, поэтому необходимо активировать плагин [quick_info](guides/extensions-list.md#quick-info).
:::

### Related Guides
- [Шаблоны расширения «Quick Info» (Touch Support)](guides/touch-templates.md)
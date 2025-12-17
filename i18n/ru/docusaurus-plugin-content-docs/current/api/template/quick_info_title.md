---
sidebar_label: quick_info_title
title: quick_info_title template
description: "задаёт заголовок для всплывающей формы редактирования"
---

# quick_info_title

### Description

@short: Задаёт заголовок для всплывающей формы редактирования

@signature: quick_info_title: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - дата начала запланированного выполнения задачи
- `end` - (required) *Date* - дата предполагаемого завершения задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | number | void) - HTML-строка, которая будет отображаться в gantt

### Example

~~~jsx
gantt.templates.quick_info_title = function(start, end, task){ 
       return ev.text.substr(0,50); 
};
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 Этот template является частью расширения **Quick Info**, поэтому убедитесь, что плагин [quick_info](guides/extensions-list.md#quickinfo) включён. 
:::

### Related Guides
- [Шаблоны расширения 'Quick Info' (Поддержка Touch)](guides/touch-templates.md)

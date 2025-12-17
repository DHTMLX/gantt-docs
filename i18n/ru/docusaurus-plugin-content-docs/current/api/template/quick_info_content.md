---
sidebar_label: quick_info_content
title: quick_info_content template
description: "определяет, что отображается в всплывающей форме редактирования"
---

# quick_info_content

### Description

@short: Определяет, что отображается в всплывающей форме редактирования

@signature: quick_info_content: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - дата начала задачи
- `end` - (required) *Date* - ожидаемая дата завершения задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string) - html-контент, который будет отображаться в gantt

### Example

~~~jsx
gantt.templates.quick_info_content = function(start, end, task){ 
       return task.details || task.text;
};
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 Этот шаблон является частью расширения **Quick Info**, поэтому убедитесь, что плагин [quick_info](guides/extensions-list.md#quickinfo) включён. 
:::

### Related Guides
- [Шаблоны расширения 'Quick Info' (Поддержка Touch)](guides/touch-templates.md)

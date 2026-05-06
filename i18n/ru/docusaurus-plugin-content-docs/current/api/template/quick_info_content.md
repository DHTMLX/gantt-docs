---
sidebar_label: quick_info_content
title: quick_info_content template
description: "определяет содержимое всплывающей формы редактирования"
---

# quick_info_content

### Description

@short: Определяет содержимое всплывающей формы редактирования

@signature: quick_info_content: (start: Date, end: Date, task: Task) => string;

### Parameters

- `start` - (required) *Date* - дата начала запланированной задачи
- `end` - (required) *Date* - дата окончания запланированной задачи
- `task` - (required) *Task* - объект задачи

### Returns
- `text` - (string) - HTML-текст, который будет отрисован на диаграмме Ганта

### Example

~~~jsx
gantt.templates.quick_info_content = function(start, end, task){ 
       return task.details || task.text;
};
~~~

### Related samples
- [Расширение Quick Info](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Этот шаблон определён в расширении **Quick Info**, поэтому необходимо активировать плагин [quick_info](guides/extensions-list.md#quick-info).
:::

### Related Guides
- [Шаблоны расширения 'Quick Info' (Поддержка касания)](guides/touch-templates.md)
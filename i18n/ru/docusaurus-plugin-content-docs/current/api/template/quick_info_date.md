---
sidebar_label: quick_info_date
title: quick_info_date template
description: "задаёт дату, отображаемую в pop-up форме редактирования"
---

# quick_info_date

### Description

@short: Задаёт дату, отображаемую в pop-up форме редактирования

@signature: quick_info_date: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - дата, когда планируется начать задачу
- `end` - (required) *Date* - дата, когда планируется завершить задачу
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string) - html содержимое, отображаемое в gantt

### Example

~~~jsx
gantt.templates.quick_info_date = function(start, end, task){
       return gantt.templates.task_time(start, end, task);
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

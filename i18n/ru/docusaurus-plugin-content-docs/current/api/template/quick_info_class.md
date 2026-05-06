---
sidebar_label: quick_info_class
title: Шаблон quick_info_class
description: "задает CSS класс, который будет применяться к всплывающей форме редактирования"
---

# quick_info_class

### Description

@short: Задает CSS класс, который будет применяться к всплывающей форме редактирования

@signature: quick_info_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - дата начала запланированной задачи
- `end` - (required) *Date* - дата завершения запланированной задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | void) - имя класса, которое будет применено к всплывающему окну Quick Info

### Example

~~~jsx
gantt.templates.quick_info_class = function(start, end, task){ 
    return task.type == gantt.config.types.milestone ? "milestone_popup" : "";
};
~~~

### Details

:::note
Этот шаблон определяется в расширении **Quick Info**, поэтому вам нужно активировать плагин [quick_info](guides/extensions-list.md#quick-info).
:::

### Related Guides
- [Templates of the 'Quick Info' Extension (Touch Support)](guides/touch-templates.md)
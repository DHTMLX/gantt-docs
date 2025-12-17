---
sidebar_label: quick_info_class
title: quick_info_class template
description: "определяет CSS класс, который применяется к всплывающей форме редактирования"
---

# quick_info_class

### Description

@short: Определяет CSS класс, который применяется к всплывающей форме редактирования

@signature: quick_info_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - начальная дата запланированной задачи
- `end` - (required) *Date* - конечная дата, к которой задача должна быть выполнена
- `task` - (required) *Task* - сам объект задачи

### Returns
- ` text` - (string | void) - имя CSS класса, который будет использоваться для всплывающего окна Quick Info

### Example

~~~jsx
gantt.templates.quick_info_class = function(start, end, task){ 
    return task.type == gantt.config.types.milestone ? "milestone_popup" : "";
};
~~~

### Details

:::note
note Этот шаблон является частью расширения **Quick Info**, поэтому убедитесь, что плагин [quick_info](guides/extensions-list.md#quickinfo) включен. 
:::

### Related Guides
- [Шаблоны расширения 'Quick Info' (Поддержка Touch)](guides/touch-templates.md)

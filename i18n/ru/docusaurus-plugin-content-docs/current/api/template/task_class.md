---
sidebar_label: task_class
title: task_class template
description: "определяет CSS класс, который применяется к task bars"
---

# task_class

### Description

@short: Определяет CSS класс, который применяется к task bars

@signature: task_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - дата, когда задача планируется к началу  
- `end` - (required) *Date* - дата, когда задача планируется к завершению
- `task` - (required) *Task* - сам объект задачи

### Returns
- ` text` - (string | void) - CSS класс, который будет назначен элементу

### Example

~~~jsx
gantt.templates.task_class = function(start, end, task){return "";};
~~~

### Related Guides
- [Шаблоны области временной шкалы](guides/timeline-templates.md)

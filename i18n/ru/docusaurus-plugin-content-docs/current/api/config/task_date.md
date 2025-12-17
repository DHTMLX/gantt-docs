---
sidebar_label: task_date
title: task_date config
description: "определяет формат отображения даты в метке, показанной в разделе 'Time period' в лайтбоксе"
---

# task_date

### Description

@short: Определяет формат отображения даты в метке, показанной в разделе «Time period» в лайтбоксе

@signature: task_date: string

### Example

~~~jsx
gantt.config.task_date = "%d-%m-%Y";
gantt.init("gantt_here");
~~~

**Default value:** "%d %F %Y"

### Related API
- [task_date](api/template/task_date.md)

### Related Guides
- [Спецификация формата даты](guides/date-format.md)


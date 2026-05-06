---
sidebar_label: task_date
title: task_date config
description: "устанавливает формат метки даты в разделе 'период времени' светового окна"
---

# task_date

### Description

@short: Устанавливает формат метки даты в разделе 'период времени' светового окна

@signature: task_date: string

### Example

~~~jsx
gantt.config.task_date = "%d-%m-%Y";
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** "%d %F %Y"

### Related API
- [task_date](api/template/task_date.md)

### Related Guides
- [Date Format Specification](guides/date-format.md)
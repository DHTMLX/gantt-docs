---
sidebar_label: time_picker
title: Конфигурация time_picker
description: "задает формат выпадающего селектора времени в lightbox"
---

# time_picker

### Description

@short: Задает формат выпадающего селектора времени в lightbox

@signature: time_picker: string

### Example

~~~jsx
gantt.config.time_picker = "%H:%s";

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** "%H:%i"

### Related API
- [time_picker](api/template/time_picker.md)

### Related Guides
- [Спецификация формата даты](guides/date-format.md)
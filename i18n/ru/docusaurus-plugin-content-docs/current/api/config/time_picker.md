---
sidebar_label: time_picker
title: time_picker config
description: "определяет формат для выпадающего селектора времени в lightbox"
---

# time_picker

### Description

@short: Определяет формат для выпадающего селектора времени в lightbox

@signature: time_picker: string

### Example

~~~jsx
gantt.config.time_picker = "%H:%s";

gantt.init("gantt_here");
~~~

**Default value:** "%H:%i"

### Related API
- [time_picker](api/template/time_picker.md)

### Related Guides
- [Спецификация формата даты](guides/date-format.md)


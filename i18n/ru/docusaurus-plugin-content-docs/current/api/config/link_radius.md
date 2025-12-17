---
sidebar_label: link_radius
title: link_radius config
description: "управляет радиусом скругления углов линий связей в timeline"
---

# link_radius

### Description

@short: Управляет радиусом скругления углов линий связей в timeline

@signature: link_radius: number

### Example

~~~jsx
gantt.config.link_radius = 6;
gantt.init("gantt_here");
~~~

**Default value:** 4

### Details

Это свойство задаёт, насколько сильно будут скруглены углы линий связей в timeline. Если значение равно 1 или меньше, скругление отключается. Если сегмент связи слишком короткий, чтобы вместить указанный радиус, скругление к этому сегменту применяться не будет.

### Related API
- [link_line_width](api/config/link_line_width.md)
- [link_arrow_size](api/config/link_arrow_size.md)

### Change log
- добавлено в версии 9.0


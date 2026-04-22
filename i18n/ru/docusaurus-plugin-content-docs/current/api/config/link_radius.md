---
sidebar_label: link_radius
title: link_radius config
description: "задает радиус скругления углов линий связи на таймлайне"
---

# link_radius

### Description

@short: Задает радиус скругления углов линий связи на таймлайне

@signature: link_radius: number

### Example

~~~jsx
gantt.config.link_radius = 6;
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** 4

### Details

Свойство задает радиус скругления углов линий связи на таймлайне. Если значение меньше или равно 1, скругление отключается. Если длина сегмента связи недостаточна для указанного радиуса, скругление не будет применено к этому сегменту.

### Related API
- [link_line_width](api/config/link_line_width.md)
- [link_arrow_size](api/config/link_arrow_size.md)

### Change log
- добавлено в v9.0
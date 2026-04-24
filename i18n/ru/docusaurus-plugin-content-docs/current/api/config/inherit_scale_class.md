---
sidebar_label: inherit_scale_class
title: inherit_scale_class config
description: "определяет, будут ли подшкалы по умолчанию использовать шаблон scale_cell_class"
---

# inherit_scale_class

### Description

@short: Определяет, будут ли подшкалы по умолчанию использовать шаблон scale_cell_class

@signature: inherit_scale_class: boolean

### Example

~~~jsx
gantt.config.inherit_scale_class=true;
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** false

### Details

Опция добавлена в версии 3.2. 
В более ранних версиях подшкалы по умолчанию всегда использовали шаблон [scale_cell_class](api/template/scale_cell_class.md). Установка опции в значение 'true' вернет прежнее поведение.

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)
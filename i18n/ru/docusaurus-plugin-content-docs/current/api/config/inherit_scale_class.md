---
sidebar_label: inherit_scale_class
title: inherit_scale_class config
description: "контролирует, используют ли подшкалы по умолчанию шаблон scale_cell_class"
---

# inherit_scale_class

### Description

@short: Контролирует, используют ли подшкалы по умолчанию шаблон scale_cell_class

@signature: inherit_scale_class: boolean

### Example

~~~jsx
gantt.config.inherit_scale_class=true;
gantt.init("gantt_here");
~~~

**Default value:** false

### Details

Эта опция была введена в версии 3.2. <br>
Ранее подшкалы всегда по умолчанию применяли шаблон [scale_cell_class](api/template/scale_cell_class.md). Включение этой опции, установив значение 'true', восстановит это прежнее поведение.

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)


---
sidebar_label: inherit_scale_class
title: inherit_scale_class config
description: "控制子刻度是否默认使用 scale_cell_class 模板"
---

# inherit_scale_class

### Description

@short: 控制子刻度是否默认使用 scale_cell_class 模板

@signature: inherit_scale_class: boolean

### Example

~~~jsx
gantt.config.inherit_scale_class=true;
gantt.init("gantt_here");
~~~

**Default value:** false

### Details

此选项自版本 3.2 引入。<br>
在此之前，子刻度默认总是应用 [scale_cell_class](api/template/scale_cell_class.md) 模板。将此选项设置为 'true' 可恢复之前的行为。

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)


---
sidebar_label: inherit_scale_class
title: inherit_scale_class 配置
description: "指定子刻度默认是否使用 scale_cell_class 模板"
---

# inherit_scale_class

### Description

@short: 指定子刻度默认是否使用 scale_cell_class 模板

@signature: inherit_scale_class: boolean

### Example

~~~jsx
gantt.config.inherit_scale_class=true;
gantt.init("gantt_here");
~~~

**默认值：** false

### Details

该选项在版本 3.2 中新增。早期版本中，子刻度始终默认使用 [scale_cell_class](api/template/scale_cell_class.md) 模板。将该选项设置为 'true' 将恢复旧行为。

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)
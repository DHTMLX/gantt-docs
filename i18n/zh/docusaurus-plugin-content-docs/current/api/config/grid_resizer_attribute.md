---
sidebar_label: grid_resizer_attribute
title: grid_resizer_attribute 配置
description: "设置 grid resizer 的 DOM 元元素属性名称"
---

# grid_resizer_attribute

:::warning
该属性已废弃。
:::

### Description

@short: 设置 grid resizer 的 DOM 元素属性名称

### Example

~~~jsx
gantt.config.grid_resizer_attribute = "gridresizer";
~~~

**默认值：** "grid_resizer"

### Details

:::note
请使用 [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md) 代替：
:::

~~~js
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

### Related API
- [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md)
- [grid_resize](api/config/grid_resize.md)
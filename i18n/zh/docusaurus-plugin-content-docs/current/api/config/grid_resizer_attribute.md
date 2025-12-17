---
sidebar_label: grid_resizer_attribute
title: grid_resizer_attribute config
description: "指定用于 grid resizer 的 DOM 元素的属性名称"
---

# grid_resizer_attribute

### Description

@short: 指定用于 grid resizer 的 DOM 元素的属性名称

### Example

~~~jsx
gantt.config.grid_resizer_attribute = "gridresizer";
~~~

**Default value:** "grid_resizer"

### Details

:::note
 此属性已被弃用。建议改用 [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md): 
:::

~~~js
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

### Related API
- [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md)
- [grid_resize](api/config/grid_resize.md)


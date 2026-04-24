---
sidebar_label: grid_resizer_column_attribute
title: grid_resizer_column_attribute 配置
description: "设置列调整器的 DOM 元素属性名。该属性表示列的索引"
---

# grid_resizer_column_attribute

:::info
此功能仅在 PRO 版本中提供。 
:::

### Description

@short: 设置列调整器的 DOM 元素的属性名。该属性表示列的索引

@signature: grid_resizer_column_attribute: string

### Example

~~~jsx
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

**默认值:** "data-column-index"

### Related API
- [grid_resize](api/config/grid_resize.md)
---
sidebar_label: grid_resizer_column_attribute
title: grid_resizer_column_attribute config
description: "指定用于列调整大小器DOM元素的属性名称。该属性表示列的索引"
---

# grid_resizer_column_attribute
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 指定用于列调整大小器DOM元素的属性名称。该属性表示列的索引

@signature: grid_resizer_column_attribute: string

### Example

~~~jsx
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

**Default value:** "data-column-index"

### Related API
- [grid_resize](api/config/grid_resize.md)


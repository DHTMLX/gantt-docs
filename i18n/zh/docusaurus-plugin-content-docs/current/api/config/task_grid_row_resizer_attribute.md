---
sidebar_label: task_grid_row_resizer_attribute
title: task_grid_row_resizer_attribute config
description: "定义用于网格行调整大小器DOM元素上的属性名称，表示该行的索引"
---

# task_grid_row_resizer_attribute

### Description

@short: 定义用于网格行调整大小器DOM元素上的属性名称，表示该行的索引

@signature: task_grid_row_resizer_attribute: string

### Example

~~~jsx
gantt.config.task_grid_row_resizer_attribute = "data-grid-row-index"
~~~

**Default value:** "data-row-index"

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Details

:::note
 当启用 [gantt.config.resize_rows](api/config/resize_rows.md) 时，此设置生效。 
:::

### Related API
- [resize_rows](api/config/resize_rows.md)

### Related Guides
- [调整网格中的行高](guides/resizing-rows.md)


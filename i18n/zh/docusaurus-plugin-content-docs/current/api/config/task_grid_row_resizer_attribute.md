---
sidebar_label: task_grid_row_resizer_attribute
title: task_grid_row_resizer_attribute 配置
description: "设置网格行的 resizer 的 DOM 元素的属性名称。该属性表示行的索引"
---

# task_grid_row_resizer_attribute

### Description

@short: 设置网格行的 resizer 的 DOM 元素的属性名称。该属性表示行的索引

@signature: task_grid_row_resizer_attribute: string

### Example

~~~jsx
gantt.config.task_grid_row_resizer_attribute = "data-grid-row-index"
~~~

**默认值：** "data-row-index"

### Related samples
- [在网格中调整大小的行](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Details

:::note
note 当启用 [gantt.config.resize_rows](api/config/resize_rows.md) 时，该配置将生效。 
:::

### Related API
- [resize_rows](api/config/resize_rows.md)

### Related Guides
- [网格中的行调整大小指南](guides/resizing-rows.md)
---
sidebar_label: task_grid_row_resizer_attribute
title: task_grid_row_resizer_attribute config
description: "sets the name of the attribute of the resizer's DOM element of the grid row. The attribute presents the row's index"
---

# task_grid_row_resizer_attribute

### Description

@short: Sets the name of the attribute of the resizer's DOM element of the grid row. The attribute presents the row's index

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
note The config is applied when [gantt.config.resize_rows](api/config/resize_rows.md) is enabled. 
:::

### Related API
- [resize_rows](api/config/resize_rows.md)

### Related Guides
- [Resizing Rows in Grid](guides/resizing-rows.md)


---
sidebar_label: min_grid_column_width
title: min_grid_column_width config
description: "在调整网格大小时，为每个网格列设置最小宽度（以像素为单位）"
---

# min_grid_column_width

### Description

@short: 在调整网格大小时，为每个网格列设置最小宽度（以像素为单位）

@signature: min_grid_column_width: number

### Example

~~~jsx
gantt.config.min_grid_column_width = 100;

gantt.init("gantt_here");
~~~

**默认值：** 70

### Details

The **min_width** property of a column has a priority over the **min_grid_column_width** property of the gantt.

### Related Guides
- [指定列](guides/specifying-columns.md#resizing)
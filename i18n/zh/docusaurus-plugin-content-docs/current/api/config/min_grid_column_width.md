---
sidebar_label: min_grid_column_width
title: min_grid_column_width config
description: "定义调整 grid 大小时，每个 grid 列的最小宽度（以像素为单位）"
---

# min_grid_column_width

### Description

@short: 定义调整 grid 大小时，每个 grid 列的最小宽度（以像素为单位）

@signature: min_grid_column_width: number

### Example

~~~jsx
gantt.config.min_grid_column_width = 100;

gantt.init("gantt_here");
~~~

**Default value:** 70

### Details

列的 **min_width** 设置优先于 gantt 的 **min_grid_column_width** 设置。

### Related Guides
- [指定列](guides/specifying-columns.md#resizing)

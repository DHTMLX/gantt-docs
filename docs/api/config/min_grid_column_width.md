---
sidebar_label: min_grid_column_width
title: min_grid_column_width config
description: "sets the minimal width for each grid column (in pixels) while resizing grid"
---

# min_grid_column_width

### Description

@short: Sets the minimal width for each grid column (in pixels) while resizing grid

@signature: min_grid_column_width: number

### Example

~~~jsx
gantt.config.min_grid_column_width = 100;

gantt.init("gantt_here");
~~~

**Default value:** 70

### Details

The **min_width** property of a column has a priority over the **min_grid_column_width** property of the gantt.

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)

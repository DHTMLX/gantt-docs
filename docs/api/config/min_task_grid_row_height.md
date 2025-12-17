---
sidebar_label: min_task_grid_row_height
title: min_task_grid_row_height config
description: "sets the minimal row height that can be set for a task during resizing"
---

# min_task_grid_row_height

### Description

@short: Sets the minimal row height that can be set for a task during resizing

@signature: min_task_grid_row_height: number

### Example

~~~jsx
gantt.config.min_task_grid_row_height = 45;
~~~

**Default value:** 30

### Details

The property will work if [gantt.config.resize_rows](api/config/resize_rows.md) is set to *true*.

### Change log
- added in v7.1


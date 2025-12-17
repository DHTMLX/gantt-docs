---
sidebar_label: min_task_grid_row_height
title: min_task_grid_row_height config
description: "定义任务行在调整大小时的最小高度"
---

# min_task_grid_row_height

### Description

@short: 定义任务行在调整大小时的最小高度

@signature: min_task_grid_row_height: number

### Example

~~~jsx
gantt.config.min_task_grid_row_height = 45;
~~~

**Default value:** 30

### Details

此设置仅在启用 [gantt.config.resize_rows](api/config/resize_rows.md) (*true*) 时生效。

### Change log
- added in v7.1


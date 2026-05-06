---
sidebar_label: min_task_grid_row_height
title: min_task_grid_row_height 配置
description: "在调整大小时可以设置的最小任务行高"
---

# min_task_grid_row_height

### Description

@short: 设置在调整大小时可以为任务设置的最小行高

@signature: min_task_grid_row_height: number

### Example

~~~jsx
gantt.config.min_task_grid_row_height = 45;
~~~

**默认值:** 30

### Details

该属性仅在 [gantt.config.resize_rows](api/config/resize_rows.md) 设置为 *true* 时生效。

### Change log
- 在 v7.1 中新增
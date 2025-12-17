---
sidebar_label: min_task_grid_row_height
title: min_task_grid_row_height config
description: "определяет минимальную высоту строки задачи при изменении размера"
---

# min_task_grid_row_height

### Description

@short: Определяет минимальную высоту строки задачи при изменении размера

@signature: min_task_grid_row_height: number

### Example

~~~jsx
gantt.config.min_task_grid_row_height = 45;
~~~

**Default value:** 30

### Details

Этот параметр действует только если включена опция [gantt.config.resize_rows](api/config/resize_rows.md) (*true*).

### Change log
- добавлено в версии v7.1


---
sidebar_label: min_task_grid_row_height
title: min_task_grid_row_height config
description: "устанавливает минимальную высоту строки, которую можно задать для задачи во время изменения размера"
---

# min_task_grid_row_height

### Description

@short: Устанавливает минимальную высоту строки, которую можно задать для задачи во время изменения размера

@signature: min_task_grid_row_height: number

### Example

~~~jsx
gantt.config.min_task_grid_row_height = 45;
~~~

**Default value:** 30

### Details

Свойство будет работать, если [gantt.config.resize_rows](api/config/resize_rows.md) установлен в значение *true*.

### Change log
- добавлено в v7.1
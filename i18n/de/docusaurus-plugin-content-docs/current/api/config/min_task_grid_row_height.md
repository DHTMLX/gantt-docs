---
sidebar_label: min_task_grid_row_height
title: min_task_grid_row_height config
description: "definiert die minimale Höhe, die eine Task-Zeile beim Ändern der Größe haben kann"
---

# min_task_grid_row_height

### Description

@short: Definiert die minimale Höhe, die eine Task-Zeile beim Ändern der Größe haben kann

@signature: min_task_grid_row_height: number

### Example

~~~jsx
gantt.config.min_task_grid_row_height = 45;
~~~

**Default value:** 30

### Details

Diese Einstellung ist nur wirksam, wenn [gantt.config.resize_rows](api/config/resize_rows.md) aktiviert (*true*) ist.

### Change log
- hinzugefügt in v7.1


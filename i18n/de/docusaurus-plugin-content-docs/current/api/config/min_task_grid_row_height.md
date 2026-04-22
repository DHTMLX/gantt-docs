---
sidebar_label: min_task_grid_row_height
title: min_task_grid_row_height config
description: "Legt die minimale Zeilenhöhe fest, die während einer Größenänderung einer Aufgabe festgelegt werden kann"
---

# min_task_grid_row_height

### Description

@short: Legt die minimale Zeilenhöhe fest, die während einer Größenänderung einer Aufgabe festgelegt werden kann

@signature: min_task_grid_row_height: number

### Example

~~~jsx
gantt.config.min_task_grid_row_height = 45;
~~~

**Standardwert:** 30

### Details

Die Eigenschaft funktioniert, wenn [gantt.config.resize_rows](api/config/resize_rows.md) auf *true* gesetzt ist.

### Change log
- hinzugefügt in v7.1
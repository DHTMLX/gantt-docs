---
sidebar_label: min_grid_column_width
title: min_grid_column_width config
description: "задаёт минимальную ширину для каждого столбца grid (в пикселях) при изменении размера grid"
---

# min_grid_column_width

### Description

@short: Задаёт минимальную ширину для каждого столбца grid (в пикселях) при изменении размера grid

@signature: min_grid_column_width: number

### Example

~~~jsx
gantt.config.min_grid_column_width = 100;

gantt.init("gantt_here");
~~~

**Default value:** 70

### Details

Настройка **min_width** для отдельного столбца имеет приоритет над настройкой **min_grid_column_width** в gantt.

### Related Guides
- [Указание колонок](guides/specifying-columns.md#resizing)

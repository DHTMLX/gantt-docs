---
sidebar_label: min_grid_column_width
title: min_grid_column_width конфигурация
description: "устанавливает минимальную ширину для каждого столбца grid (в пикселях) во время изменения размера grid"
---

# min_grid_column_width

### Description

@short: Устанавливает минимальную ширину для каждого столбца grid (в пикселях) во время изменения размера grid

@signature: min_grid_column_width: number

### Example

~~~jsx
gantt.config.min_grid_column_width = 100;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** 70

### Details

Свойство **min_width** столбца имеет приоритет над свойством **min_grid_column_width** у gantt.

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)
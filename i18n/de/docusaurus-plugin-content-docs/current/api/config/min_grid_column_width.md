---
sidebar_label: min_grid_column_width
title: min_grid_column_width config
description: "definiert die minimale Breite jeder Grid-Spalte (in Pixel) beim Ändern der Größe des Grids"
---

# min_grid_column_width

### Description

@short: Definiert die minimale Breite jeder Grid-Spalte (in Pixel) beim Ändern der Größe des Grids

@signature: min_grid_column_width: number

### Example

~~~jsx
gantt.config.min_grid_column_width = 100;

gantt.init("gantt_here");
~~~

**Default value:** 70

### Details

Die Einstellung **min_width** für eine Spalte hat Vorrang vor der **min_grid_column_width** Einstellung des Gantts.

### Related Guides
- ["Spalten festlegen"](guides/specifying-columns.md#resizing)

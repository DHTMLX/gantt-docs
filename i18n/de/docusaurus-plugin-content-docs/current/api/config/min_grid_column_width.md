---
sidebar_label: min_grid_column_width
title: min_grid_column_width Konfiguration
description: "legt die minimale Breite jeder Grid-Spalte (in Pixeln) fest, während das Grid angepasst wird"
---

# min_grid_column_width

### Description

@short: Setzt die minimale Breite jeder Grid-Spalte (in Pixeln) während der Größenänderung des Grids

@signature: min_grid_column_width: number

### Example

~~~jsx
gantt.config.min_grid_column_width = 100;

gantt.init("gantt_here");
~~~

**Standardwert:** 70

### Details

Die **min_width**-Eigenschaft einer Spalte hat Vorrang vor der **min_grid_column_width**-Eigenschaft des Gantt.

### Related Guides
- [Spalten festlegen](guides/specifying-columns.md#resizing)
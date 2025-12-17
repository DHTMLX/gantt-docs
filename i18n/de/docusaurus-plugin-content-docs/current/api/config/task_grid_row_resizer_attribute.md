---
sidebar_label: task_grid_row_resizer_attribute
title: task_grid_row_resizer_attribute config
description: "definiert den Attributnamen, der am DOM-Element des Resizers für eine Grid-Zeile verwendet wird und den Index der Zeile angibt"
---

# task_grid_row_resizer_attribute

### Description

@short: Definiert den Attributnamen, der am DOM-Element des Resizers für eine Grid-Zeile verwendet wird und den Index der Zeile angibt

@signature: task_grid_row_resizer_attribute: string

### Example

~~~jsx
gantt.config.task_grid_row_resizer_attribute = "data-grid-row-index"
~~~

**Default value:** "data-row-index"

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Details

:::note
 Diese Einstellung wirkt sich aus, wenn [gantt.config.resize_rows](api/config/resize_rows.md) aktiviert ist. 
:::

### Related API
- [resize_rows](api/config/resize_rows.md)

### Related Guides
- ["Größenänderung von Zeilen im Grid"](guides/resizing-rows.md)


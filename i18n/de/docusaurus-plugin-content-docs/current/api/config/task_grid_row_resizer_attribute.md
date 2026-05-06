---
sidebar_label: task_grid_row_resizer_attribute
title: task_grid_row_resizer_attribute config
description: "legt den Namen des Attributs des Resizer-DOM-Elements der Grid-Zeile fest. Das Attribut stellt den Index der Zeile dar"
---

# task_grid_row_resizer_attribute

### Description

@short: Legt den Namen des Attributs des Resizer-DOM-Elements der Grid-Zeile fest. Das Attribut gibt den Index der Zeile an

@signature: task_grid_row_resizer_attribute: string

### Example

~~~jsx
gantt.config.task_grid_row_resizer_attribute = "data-grid-row-index"
~~~

**Standardwert:** "data-row-index"

### Related samples
- [Skalierbare Zeilen im Grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Details

:::note
Hinweis: Die Konfiguration wird angewendet, wenn [gantt.config.resize_rows](api/config/resize_rows.md) aktiviert ist.
:::

### Related API
- [resize_rows](api/config/resize_rows.md)

### Related Guides
- [Zeilen im Grid skalieren](guides/resizing-rows.md)
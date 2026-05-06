---
sidebar_label: grid_resizer_column_attribute
title: grid_resizer_column_attribute Konfiguration
description: "legt den Namen des Attributs des DOM-Elements des Spalten-Resizers fest. Das Attribut repräsentiert den Spaltenindex"
---

# grid_resizer_column_attribute

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Legt den Namen des Attributs des DOM-Elements des Spalten-Resizers fest. Das Attribut repräsentiert den Spaltenindex

@signature: grid_resizer_column_attribute: string

### Example

~~~jsx
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

**Standardwert:** "data-column-index"

### Related API
- [grid_resize](api/config/grid_resize.md)
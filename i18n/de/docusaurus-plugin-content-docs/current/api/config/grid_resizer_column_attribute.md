---
sidebar_label: grid_resizer_column_attribute
title: grid_resizer_column_attribute config
description: "Gibt den Attributnamen an, der am DOM-Element des Spalten-Resizers verwendet wird. Dieses Attribut kennzeichnet den Index der Spalte."
---

# grid_resizer_column_attribute
:::info
 Dieses Feature ist ausschließlich in der PRO Edition verfügbar. 
:::
### Description

@short: Gibt den Attributnamen an, der am DOM-Element des Spalten-Resizers verwendet wird. Dieses Attribut kennzeichnet den Index der Spalte.

@signature: grid_resizer_column_attribute: string

### Example

~~~jsx
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

**Default value:** "data-column-index"


### Related API
- [grid_resize](api/config/grid_resize.md)


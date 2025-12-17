---
sidebar_label: grid_resizer_attribute
title: grid_resizer_attribute config
description: "Gibt den Namen des Attributes für das DOM-Element des grid resizers an"
---

# grid_resizer_attribute

### Description

@short: Gibt den Namen des Attributes für das DOM-Element des grid resizers an

### Example

~~~jsx
gantt.config.grid_resizer_attribute = "gridresizer";
~~~

**Default value:** "grid_resizer"

### Details

:::note
 Diese Eigenschaft ist veraltet. Es wird empfohlen, stattdessen das [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md) zu verwenden: 
:::

~~~js
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

### Related API
- [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md)
- [grid_resize](api/config/grid_resize.md)


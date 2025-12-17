---
sidebar_label: grid_resizer_attribute
title: grid_resizer_attribute config
description: "sets the name of the attribute of the grid resizer's DOM element"
---

# grid_resizer_attribute

:::warning
The property is deprecated.
:::

### Description

@short: Sets the name of the attribute of the grid resizer's DOM element

### Example

~~~jsx
gantt.config.grid_resizer_attribute = "gridresizer";
~~~

**Default value:** "grid_resizer"

### Details

:::note
Use the [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md) instead: 
:::

~~~js
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

### Related API
- [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md)
- [grid_resize](api/config/grid_resize.md)


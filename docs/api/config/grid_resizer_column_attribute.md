---
sidebar_label: grid_resizer_column_attribute
title: grid_resizer_column_attribute config
description: "sets the name of the attribute of the column resizer's DOM element. The attribute presents the column's index"
---

# grid_resizer_column_attribute

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Sets the name of the attribute of the column resizer's DOM element. The attribute presents the column's index

@signature: grid_resizer_column_attribute: string

### Example

~~~jsx
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

**Default value:** "data-column-index"

### Related API
- [grid_resize](api/config/grid_resize.md)


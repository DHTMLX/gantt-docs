---
sidebar_label: grid_resizer_attribute
title: grid_resizer_attribute Konfiguration
description: "legt den Namen des Attributs des DOM-Elements des Grid-Resizers fest"
---

# grid_resizer_attribute

:::warning
Die Eigenschaft ist veraltet.
:::

### Description

@short: Legt den Namen des Attributs des DOM-Elements des Grid-Resizers fest

### Example

~~~jsx
gantt.config.grid_resizer_attribute = "gridresizer";
~~~

**Standardwert:** "grid_resizer"

### Details

:::note
Verwenden Sie stattdessen [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md)
:::

~~~js
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

### Related API
- [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md)
- [grid_resize](api/config/grid_resize.md)
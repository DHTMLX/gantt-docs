---
sidebar_label: grid_resizer_attribute
title: grid_resizer_attribute config
description: "задает имя атрибута DOM-элемента grid resizer"
---

# grid_resizer_attribute

:::warning
Свойство устарело.
:::

### Description

@short: Устанавливает имя атрибута DOM-элемента grid resizer

### Example

~~~jsx
gantt.config.grid_resizer_attribute = "gridresizer";
~~~

**Значение по умолчанию:** "grid_resizer"

### Details

:::note
Используйте [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md) вместо этого:
:::

~~~js
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

### Related API
- [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md)
- [grid_resize](api/config/grid_resize.md)
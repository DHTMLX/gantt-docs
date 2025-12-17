---
sidebar_label: grid_resizer_attribute
title: grid_resizer_attribute config
description: "задаёт имя атрибута для DOM-элемента grid resizer'а"
---

# grid_resizer_attribute

### Description

@short: Задаёт имя атрибута для DOM-элемента grid resizer'а

### Example

~~~jsx
gantt.config.grid_resizer_attribute = "gridresizer";
~~~

**Default value:** "grid_resizer"

### Details

:::note
 Это свойство устарело. Рекомендуется использовать [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md) вместо него: 
:::

~~~js
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

### Related API
- [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md)
- [grid_resize](api/config/grid_resize.md)


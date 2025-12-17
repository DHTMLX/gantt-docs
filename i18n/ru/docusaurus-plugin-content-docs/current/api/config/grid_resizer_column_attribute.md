---
sidebar_label: grid_resizer_column_attribute
title: grid_resizer_column_attribute config
description: "указывает имя атрибута, используемого на DOM-элементе ресайзера колонки. Этот атрибут обозначает индекс колонки"
---

# grid_resizer_column_attribute
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Указывает имя атрибута, используемого на DOM-элементе ресайзера колонки. Этот атрибут обозначает индекс колонки

@signature: grid_resizer_column_attribute: string

### Example

~~~jsx
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

**Default value:** "data-column-index"


### Related API
- [grid_resize](api/config/grid_resize.md)


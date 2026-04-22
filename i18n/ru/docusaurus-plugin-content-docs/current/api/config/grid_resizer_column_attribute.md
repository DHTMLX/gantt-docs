---
sidebar_label: grid_resizer_column_attribute
title: grid_resizer_column_attribute конфигурация
description: "задает имя атрибута DOM-элемента ползунка столбца. Атрибут содержит индекс столбца"
---

# grid_resizer_column_attribute

:::info
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Задает имя атрибута DOM-элемента ползунка столбца. Этот атрибут содержит индекс столбца

@signature: grid_resizer_column_attribute: string

### Example

~~~jsx
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

**Значение по умолчанию:** "data-column-index"

### Related API
- [grid_resize](api/config/grid_resize.md)
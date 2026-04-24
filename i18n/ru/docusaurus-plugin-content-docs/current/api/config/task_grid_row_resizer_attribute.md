---
sidebar_label: task_grid_row_resizer_attribute
title: task_grid_row_resizer_attribute config
description: "задает имя атрибута DOM-элемента резайзера строки сетки. Атрибут представляет индекс строки"
---

# task_grid_row_resizer_attribute

### Описание

@short: Задает имя атрибута DOM-элемента резайзера строки сетки. Атрибут представляет индекс строки

@signature: task_grid_row_resizer_attribute: string

### Пример

~~~jsx
gantt.config.task_grid_row_resizer_attribute = "data-grid-row-index"
~~~

**Значение по умолчанию:** "data-row-index"

### Связанные примеры
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Подробности

:::note
Примечание. Конфигурация применяется, когда включен [gantt.config.resize_rows](api/config/resize_rows.md). 
:::

### Связанные API
- [resize_rows](api/config/resize_rows.md)

### Связанные руководства
- [Resizing Rows in Grid](guides/resizing-rows.md)
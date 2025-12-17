---
sidebar_label: task_grid_row_resizer_attribute
title: task_grid_row_resizer_attribute config
description: "определяет имя атрибута, используемого в DOM-элементе ресайзера для строки grid, указывающего индекс строки"
---

# task_grid_row_resizer_attribute

### Description

@short: Определяет имя атрибута, используемого в DOM-элементе ресайзера для строки grid, указывающего индекс строки

@signature: task_grid_row_resizer_attribute: string

### Example

~~~jsx
gantt.config.task_grid_row_resizer_attribute = "data-grid-row-index"
~~~

**Default value:** "data-row-index"

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Details

:::note
 Эта настройка вступает в силу, когда включена опция [gantt.config.resize_rows](api/config/resize_rows.md). 
:::

### Related API
- [resize_rows](api/config/resize_rows.md)

### Related Guides
- [Изменение размера строк в гриде](guides/resizing-rows.md)


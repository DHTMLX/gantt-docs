---
sidebar_label: resource_render_empty_cells
title: resource_render_empty_cells config
description: "позволяет resource timeline отображать элементы и использовать шаблоны для ячеек без назначенных задач"
---

# resource_render_empty_cells
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Позволяет resource timeline отображать элементы и использовать шаблоны для ячеек без назначенных задач

@signature: resource_render_empty_cells: boolean

### Example

~~~jsx
gantt.config.resource_render_empty_cells = true;
~~~

**Default value:** false

### Details

Обычно resource timeline пропускает вызов шаблонов [resource_cell_value](api/template/resource_cell_value.md) и [resource_cell_class](api/template/resource_cell_class.md) для ячеек, в которых нет назначенных задач.

Когда эта опция включена, шаблоны будут применяться к каждой ячейке в resource timeline, независимо от наличия задач.

### Related API
- [resource_cell_class](api/template/resource_cell_class.md)
- [resource_cell_value](api/template/resource_cell_value.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md)


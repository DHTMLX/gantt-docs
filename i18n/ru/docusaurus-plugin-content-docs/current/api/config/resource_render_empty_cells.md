---
sidebar_label: resource_render_empty_cells
title: resource_render_empty_cells config
description: "сообщает таймлайну ресурса отрисовывать элементы и вызывать шаблоны для ячеек без назначенных задач"
---

# resource_render_empty_cells

:::info
Эта функциональность доступна только в версии PRO.
:::

### Description

@short: Сообщает таймлайну ресурса отрисовывать элементы и вызывать шаблоны для ячеек без назначенных задач

@signature: resource_render_empty_cells: boolean

### Example

~~~jsx
gantt.config.resource_render_empty_cells = true;
~~~

**Значение по умолчанию:** false

### Details

По умолчанию таймлайн ресурса не будет вызывать шаблоны [resource_cell_class](api/template/resource_cell_class.md) и [resource_cell_value](api/template/resource_cell_value.md) для ячеек, в которых не назначены задачи.

Если эта опция включена, шаблоны будут вызываться для всех ячеек временной шкалы ресурса.

### Related API
- [resource_cell_class](api/template/resource_cell_class.md)
- [resource_cell_value](api/template/resource_cell_value.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md)
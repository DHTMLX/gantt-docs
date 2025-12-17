---
sidebar_label: resource_render_empty_cells
title: resource_render_empty_cells config
description: "ermöglicht der Resource Timeline, Elemente zu rendern und Templates für Zellen ohne zugewiesene Aufgaben zu verwenden"
---

# resource_render_empty_cells
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Ermöglicht der Resource Timeline, Elemente zu rendern und Templates für Zellen ohne zugewiesene Aufgaben zu verwenden

@signature: resource_render_empty_cells: boolean

### Example

~~~jsx
gantt.config.resource_render_empty_cells = true;
~~~

**Default value:** false

### Details

Normalerweise überspringt die Resource Timeline das Aufrufen der Templates [resource_cell_value](api/template/resource_cell_value.md) und [resource_cell_class](api/template/resource_cell_class.md) für Zellen, denen keine Aufgaben zugewiesen sind.

Wenn diese Option aktiviert ist, werden Templates auf jede Zelle in der Resource Timeline angewendet, unabhängig von der Aufgabenverteilung.

### Related API
- [resource_cell_class](api/template/resource_cell_class.md)
- [resource_cell_value](api/template/resource_cell_value.md)

### Related Guides
- ["Ressourcenmanagement"](guides/resource-management.md)


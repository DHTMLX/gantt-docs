---
sidebar_label: resource_render_empty_cells
title: resource_render_empty_cells Konfiguration
description: "weist die Ressourcen-Timeline an, Elemente zu rendern und Templates für nicht zugewiesene Zellen aufzurufen"
---

# resource_render_empty_cells

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Weise die Ressourcen-Timeline an, Elemente zu rendern und Templates für nicht zugewiesene Zellen aufzurufen

@signature: resource_render_empty_cells: boolean

### Example

~~~jsx
gantt.config.resource_render_empty_cells = true;
~~~

**Standardwert:** false

### Details

Standardmäßig ruft die Ressourcen-Timeline die Templates [resource_cell_value](api/template/resource_cell_value.md) und [resource_cell_class](api/template/resource_cell_class.md) für Zellen, denen keine Aufgaben zugewiesen sind, nicht auf.

Wenn diese Option aktiviert ist, werden Templates für alle Zellen der Ressourcen-Timeline aufgerufen.

### Related API
- [resource_cell_class](api/template/resource_cell_class.md)
- [resource_cell_value](api/template/resource_cell_value.md)

### Verwandte Guides
- [Ressourcenverwaltung](guides/resource-management.md)
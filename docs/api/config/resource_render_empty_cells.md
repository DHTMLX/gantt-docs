---
sidebar_label: resource_render_empty_cells
title: resource_render_empty_cells config
description: "tells the resource timeline to render elements and call templates for non-allocated cells"
---

# resource_render_empty_cells

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Tells the resource timeline to render elements and call templates for non-allocated cells

@signature: resource_render_empty_cells: boolean

### Example

~~~jsx
gantt.config.resource_render_empty_cells = true;
~~~

**Default value:** false

### Details

By default, the resource timeline won't call the [resource_cell_value](api/template/resource_cell_value.md) and [resource_cell_class](api/template/resource_cell_class.md) templates for cells that don't have any tasks allocated.

If this option is enabled, templates will be called for all cells of the resource timeline.

### Related API
- [resource_cell_class](api/template/resource_cell_class.md)
- [resource_cell_value](api/template/resource_cell_value.md)

### Related Guides
- [Resource Management](guides/resource-management.md)


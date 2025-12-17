---
sidebar_label: resource_render_empty_cells
title: resource_render_empty_cells config
description: "允许资源时间线为没有分配任务的单元格渲染元素并使用模板"
---

# resource_render_empty_cells
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 允许资源时间线为没有分配任务的单元格渲染元素并使用模板

@signature: resource_render_empty_cells: boolean

### Example

~~~jsx
gantt.config.resource_render_empty_cells = true;
~~~

**Default value:** false

### Details

通常，资源时间线会跳过调用 [resource_cell_value](api/template/resource_cell_value.md) 和 [resource_cell_class](api/template/resource_cell_class.md) 模板，用于那些没有分配任务的单元格。

当启用此选项时，模板将应用于资源时间线中的每个单元格，无论是否分配了任务。

### Related API
- [resource_cell_class](api/template/resource_cell_class.md)
- [resource_cell_value](api/template/resource_cell_value.md)

### Related Guides
- [资源管理](guides/resource-management.md)


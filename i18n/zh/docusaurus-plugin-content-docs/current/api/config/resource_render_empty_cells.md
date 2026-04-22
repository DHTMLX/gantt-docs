---
sidebar_label: resource_render_empty_cells
title: resource_render_empty_cells 配置
description: "指示资源时间线为未分配的单元格渲染元素并调用模板"
---

# resource_render_empty_cells

:::info
此功能仅在 PRO 版中提供。
:::

### Description

@short: 指示资源时间线为未分配的单元格渲染元素并调用模板

@signature: resource_render_empty_cells: boolean

### Example

~~~jsx
gantt.config.resource_render_empty_cells = true;
~~~

**默认值：** false

### Details

默认情况下，资源时间线不会对尚未分配任何任务的单元格调用 [resource_cell_value](api/template/resource_cell_value.md) 和 [resource_cell_class](api/template/resource_cell_class.md) 模板。

如果启用此选项，资源时间线的所有单元格都会调用模板。

### Related API
- [resource_cell_class](api/template/resource_cell_class.md)
- [resource_cell_value](api/template/resource_cell_value.md)

### Related Guides
- [资源管理](guides/resource-management.md)
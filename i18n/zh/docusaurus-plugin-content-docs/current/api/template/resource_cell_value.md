---
sidebar_label: resource_cell_value
title: resource_cell_value template
description: "设置资源时间线中单元格的HTML内容"
---

# resource_cell_value
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 设置资源时间线中单元格的HTML内容

@signature: resource_cell_value: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | number | void;

### Parameters

- `start_date` - (required) *Date* - 刻度单元格的开始日期  
- `end_date` - (required) *Date* - 刻度单元格的结束日期
- `resource` - (required) *object* - 资源对象
- `tasks` - (required) *Array* - &lt;Task&gt;            分配给指定资源且与单元格的开始/结束日期重叠的任务列表
- `assignments` - (required) *array* - 分配给任务指定开始/结束日期的资源分配（仅当启用 [process_resource_assignments](api/config/process_resource_assignments.md) 配置时可用）

### Returns
- ` html` - (string | number | void) - 将插入到单元格 innerHTML 内的HTML字符串

### Example

~~~jsx
gantt.templates.resource_cell_value = function(start_date, end_date, resource, tasks,
    assignments){
    return "<div>" + tasks.length * 8 + "</div>";
};
~~~

### Related samples
- [Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)
- [Assign multiple owners to a task](https://docs.dhtmlx.com/gantt/samples/11_resources/06_assign_multiple_owners.html)
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details
:::note
 "assignments" 参数仅在启用 [process_resource_assignments](api/config/process_resource_assignments.md) 配置时可用。 
:::

- 设置资源时间线内单元格的HTML内容。
- 资源时间线通过任务对象上的 [resource_property](api/config/resource_property.md) 属性将任务与资源关联。
- 对于没有任何任务的单元格，除非启用了 [resource_render_empty_cells](api/config/resource_render_empty_cells.md)，否则该模板不会被触发。
- [项目类型](api/config/types.md)的任务会被排除，不会传递给 `tasks` 参数。

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_class](api/template/resource_cell_class.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [资源管理](guides/resource-management.md)

### Change log
- 在v7.1版本中添加了 **assignments** 参数


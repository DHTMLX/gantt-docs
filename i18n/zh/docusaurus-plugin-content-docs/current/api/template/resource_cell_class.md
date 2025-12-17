---
sidebar_label: resource_cell_class
title: resource_cell_class template
description: "定义资源时间线视图中单元格的CSS类名"
---

# resource_cell_class
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义资源时间线视图中单元格的CSS类名

@signature: resource_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | void;

### Parameters

- `start_date` - (required) *Date* - 刻度单元格的开始日期  
- `end_date` - (required) *Date* - 刻度单元格的结束日期
- `resource` - (required) *object* - 资源对象
- `tasks` - (required) *Array* - &lt;Task&gt;        分配给指定资源且与单元格的开始和结束日期重叠的任务
- `assignments` - (required) *array* - 与任务指定的开始和结束日期关联的资源分配

### Returns
- ` className` - (string | void) - 将被添加到单元格元素的className属性中的字符串

### Example

~~~jsx
gantt.templates.resource_cell_class = function(start_date, end_date, resource, tasks,
    assignments){
    if (tasks.length <= 1) {
        return "workday_ok";
    } else {
        return "workday_over";
    }
};
~~~

### Related samples
- [Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)
- [Assign multiple owners to a task](https://docs.dhtmlx.com/gantt/samples/11_resources/06_assign_multiple_owners.html)
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details
:::note
 参数 "assignments" 仅在启用 [process_resource_assignments](api/config/process_resource_assignments.md) 配置时可用。 
:::

- 控制应用于资源时间线中单元格的CSS类名。
- 资源时间线根据 [resource_property](api/config/resource_property.md) 中定义的属性将任务与资源关联。
- 除非启用了 [resource_render_empty_cells](api/config/resource_render_empty_cells.md)，否则该模板不会对无任务的单元格触发。
- [项目类型](api/config/types.md)的任务被排除，不会包含在 `tasks` 参数中。

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_value](api/template/resource_cell_value.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [资源管理](guides/resource-management.md)

### Change log
- **assignments** 参数自v7.1版本引入


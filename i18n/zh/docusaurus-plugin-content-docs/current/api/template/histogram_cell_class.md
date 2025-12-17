---
sidebar_label: histogram_cell_class
title: histogram_cell_class template
description: "定义应用于资源面板单元格的CSS类"
---

# histogram_cell_class
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义应用于资源面板单元格的CSS类

@signature: histogram_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | void;

### Parameters

- `start_date` - (required) *Date* - 刻度单元格的起始日期  
- `end_date` - (required) *Date* - 刻度单元格的结束日期
- `resource` - (required) *object* - 资源对象
- `tasks` - (required) *Array* - &lt;Task&gt;        分配给指定资源且与单元格起止日期重叠的任务
- `assignments` - (required) *array* - 与指定任务起止日期关联的资源分配

### Returns
- ` className` - (string | void) - 用于histogram时间线单元格的CSS类名

### Example

~~~jsx
gantt.templates.histogram_cell_class = function(start_date,end_date,resource,tasks,
    assignments){
    return "";
};
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 只有启用 [process_resource_assignments](api/config/process_resource_assignments.md) 配置时，才会提供 "assignments" 参数。 
:::

### Related API
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [资源管理](guides/resource-management.md)

### Change log
- 在v7.1版本中引入了 **assignments** 参数


---
sidebar_label: histogram_cell_allocated
title: histogram_cell_allocated template
description: "指定 resourceHistogram 中填充部分的高度"
---

# histogram_cell_allocated
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 指定 resourceHistogram 中填充部分的高度

@signature: histogram_cell_allocated: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (required) *Date* - 时间刻度单元的开始日期  
- `end_date` - (required) *Date* - 时间刻度单元的结束日期
- `resource` - (required) *object* - 资源对象
- `tasks` - (required) *Array* - &lt;Task&gt;        分配给指定资源且与单元的开始/结束日期重叠的任务列表
- `assignments` - (required) *array* - 与任务指定的开始/结束日期相关联的资源分配

### Returns
- ` height` - (number | void) - resourceHistogram 中填充部分的高度

### Example

~~~jsx
gantt.templates.histogram_cell_allocated=function(start_date,end_date,resource,tasks,
    assignments){
     return tasks.length * 8;
};
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 仅当启用 [process_resource_assignments](api/config/process_resource_assignments.md) 配置时，才能访问 "assignments" 参数。 
:::

模板的返回值范围为 0 到 *maxCapacity*。

**maxCapacity 说明**

如果将每个 histogram 行视为条形图，maxCapacity 表示该图表 Y 轴的高度。在下面的示例图片中，maxCapacity 等于 24:

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [资源管理](guides/resource-management.md)

### Change log
- **assignments** 参数在 v7.1 中引入


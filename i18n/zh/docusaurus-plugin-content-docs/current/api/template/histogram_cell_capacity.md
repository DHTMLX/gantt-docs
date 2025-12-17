---
sidebar_label: histogram_cell_capacity
title: histogram_cell_capacity template
description: "定义表示资源可用容量的线条高度"
---

# histogram_cell_capacity
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义表示资源可用容量的线条高度

@signature: histogram_cell_capacity: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (required) *Date* - 刻度单元的开始日期  
- `end_date` - (required) *Date* - 刻度单元的结束日期
- `resource` - (required) *object* - 资源对象本身
- `tasks` - (required) *Array* - &lt;Task&gt;    分配给该资源且与单元的开始/结束日期重叠的任务
- `assignments` - (required) *array* - 与任务指定的开始/结束日期关联的资源分配（仅当启用 [process_resource_assignments](api/config/process_resource_assignments.md) 配置时可用）

### Returns
- ` height` - (number | void) - 表示资源可用容量的线条高度

### Example

~~~jsx
gantt.templates.histogram_cell_capacity=function(start_date,end_date,resource,tasks,
    assignments){
    return 24;
};
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 "assignments" 参数仅在启用 [process_resource_assignments](api/config/process_resource_assignments.md) 配置时可访问。 
:::

模板的返回值范围是 -1 到 maxCapacity。返回值小于 0 会阻止该线条的渲染。

**maxCapacity 说明**

将每个 histogram 行视为一个条形图；maxCapacity 代表该图的 Y 轴高度。下图中，maxCapacity 等于 24:

![maxCapacity](/img/maxcapacity.png)

默认情况下，所有资源的 **maxCapacity** 设置为 24。在 *histogram_cell_capacity* 模板中返回超过 24 的值依然能正确计算，但资源面板的单元格区域可能不会如预期填充。

![filled_capacity](/img/filled_capacity.png)

此外，可以为整个 histogram 全局配置 **maxCapacity**，也可以为每个资源单独配置。示例如下:

:::note
Sample: [配置 maxCapacity](https://snippet.dhtmlx.com/glnqcsgq) 
:::

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [资源管理](guides/resource-management.md)

### Change log
- 在 v7.1 版本中新增了 **assignments** 参数


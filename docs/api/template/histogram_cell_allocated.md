---
sidebar_label: histogram_cell_allocated
title: histogram_cell_allocated template
description: "defines the height of the filled area in the resourceHistogram"
---

# histogram_cell_allocated
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Defines the height of the filled area in the resourceHistogram

@signature: histogram_cell_allocated: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (required) *Date* - start date of the scale cell  
- `end_date` - (required) *Date* - end date of the scale cell
- `resource` - (required) *object* - the resource object
- `tasks` - (required) *Array* - &lt;Task&gt;        tasks that are assigned to the specified resource and overlap start/end dates of the cell
- `assignments` - (required) *array* - resource assignments that are assigned to the specified start/end dates of the task

### Returns
- ` height` - (number | void) - the height of the filled area in the resourceHistogram

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
The "assignments" argument is only available when the [process_resource_assignments](api/config/process_resource_assignments.md) config is enabled. 
:::

The value of the template can be set from 0 to *maxCapacity*.

**maxCapacity definition**

If each row of the histogram is considered as a bar chart, maxCapacity is the height of the Y-scale of this chart. In the image below maxCapacity = 24:

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [Resource Management](guides/resource-management.md#resourceviewpanel)

### Change log
- the **assignments** parameter is added in v7.1


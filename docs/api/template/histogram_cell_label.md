---
sidebar_label: histogram_cell_label
title: histogram_cell_label template
description: "defines the label inside a cell"
---

# histogram_cell_label
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Defines the label inside a cell

@signature: histogram_cell_label: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | number | void;

### Parameters

- `start_date` - (required) *Date* - start date of the scale cell  
- `end_date` - (required) *Date* - end date of the scale cell
- `resource` - (required) *object* - the resource object
- `tasks` - (required) *Array* - &lt;Task&gt;        tasks that are assigned to the specified resource and overlap start/end dates of the cell
- `assignments` - (required) *array* - resource assignments that are assigned to the specified start/end dates of the task

### Returns
- ` label` - (string | number | void) - an HTML text for the label inside a histogram cell

### Example

~~~jsx
gantt.templates.histogram_cell_label = function(start_date,end_date,resource,tasks,
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

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [Resource Management](guides/resource-management.md#resourceviewpanel)

### Change log
- the **assignments** parameter is added in v7.1


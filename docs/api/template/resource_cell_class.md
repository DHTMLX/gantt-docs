---
sidebar_label: resource_cell_class
title: resource_cell_class template
description: "defines the CSS class names of cells in the resource timeline cells"
---

# resource_cell_class
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Defines the CSS class names of cells in the resource timeline cells

@signature: resource_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | void;

### Parameters

- `start_date` - (required) *Date* - start date of the scale cell  
- `end_date` - (required) *Date* - end date of the scale cell
- `resource` - (required) *object* - the resource object
- `tasks` - (required) *Array* - &lt;Task&gt;        tasks that are assigned to specified resource and overlap start/end dates of the cell
- `assignments` - (required) *array* - resource assignments that are assigned to the specified start/end dates of the task

### Returns
- ` className` - (string | void) - a string that is appended to cell element className attribute

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
The "assignments" argument is only awailable when the [process_resource_assignments](api/config/process_resource_assignments.md) config is enabled. 
:::

- Defines the CSS class names of cells in the resource timeline view.
- Resource timeline links tasks to a resource by [resource_property](api/config/resource_property.md) property of the task object.
- The template is not called for cells where no tasks are located, unless [resource_render_empty_cells](api/config/resource_render_empty_cells.md) is enabled.
- Tasks of the [project type](api/config/types.md) are not counted and won't be passed to the `tasks` argument.

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_value](api/template/resource_cell_value.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Resource Management](guides/resource-management.md)

### Change log
- the **assignments** parameter is added in v7.1


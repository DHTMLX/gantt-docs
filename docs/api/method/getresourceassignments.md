---
sidebar_label: getResourceAssignments
title: getResourceAssignments method
description: "returns all tasks assigned to the resource"
---

# getResourceAssignments

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Returns all tasks assigned to the resource

@signature: getResourceAssignments: (resourceId: string | number, taskId?: string | number) =\> ResourceAssignment[]

### Parameters

- `resourceId` - (required) *string | number* - the id of the resource
- `taskId` - (required) *string | number* - the id of the task


### Returns
- ` assignments` - (ResourceAssignment[]) - an array of objects with tasks assigned to the resource

### Example

~~~jsx
gantt.getResourceAssignments("6"); // -> see details
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

The method returns an array with objects as in:

~~~js
[ 
    {task_id: 5, resource_id: "6", value: 5, delay: 0, duration: 7, 
        start_date: "03-04-2019 00:00", end_date: "12-04-2019 00:00", 
        id: 1617258553240, mode: "default"},
    {task_id: 18, resource_id: "6", value: 2, delay: 0, duration: 2, 
        start_date: "05-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553250, mode: "default"},
    {task_id: 19, resource_id: "6", value: 3, delay: 0, duration: 4, 
        start_date: "09-04-2019 00:00", end_date: "13-04-2019 00:00", 
        id: 1617258553251, mode: "default"},
    {task_id: 21, resource_id: "6", value: 5, delay: 0, duration: 4, 
        start_date: "03-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553254, mode: "default"}
]
~~~

Each object contains the following properties:

- **id** - (*string | number*) - the id of the assignment
- **task_id** - (*string | number*) - the ID of the task the resource is assigned to.
- **resource_id** - (*string | number*) - the ID of the resource that is assigned to the task.
- **value** - (*number | string*) - the quantity of the resources assigned to a task
- **delay** - (*number*) - the difference between the assignment start date and the task start date
- **start_date** - (*Date*) - the date the assignment should start
- **end_date** - (*Date*) - the date the assignment should end
- **duration** - (*number*) - the duration of the assignment
- **mode** - (*string*) - the calculation mode of the time of the resource assignment: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - any custom property

:::note
 *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* will be populated automatically only when [process_resource_assignments](api/config/process_resource_assignments.md) is enabled.  
:::

### Related API
- [getTaskAssignments](api/method/gettaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Resource Management](guides/resource-management.md)

### Change log
- the return object will contain the *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* properties starting from v7.1


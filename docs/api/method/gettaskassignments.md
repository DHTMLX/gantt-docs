---
sidebar_label: getTaskAssignments
title: getTaskAssignments method
description: "returns the parsed resource assignments of a specific task from the datastore"
---

# getTaskAssignments

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Returns the parsed resource assignments of a specific task from the datastore

@signature: getTaskAssignments: (taskId: string | number) =\> ResourceAssignment[]

### Parameters

- `taskId` - (required) *string | number* -    the task id

### Returns
- ` param` - (ResourceAssignment[]) - an array of objects with the resource assignments of the task

### Example

~~~jsx
gantt.getTaskAssignments(5); // -> see details
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
The **getTaskAssignments** method is not available if [process_resource_assignments](api/config/process_resource_assignments.md) is disabled. 
:::

The method returns an array with objects as in:

~~~js
[
    {
        task_id: 5,
        id: 1617254693938, 
        delay: 0, duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00", 
        mode: "fixedDuration", 
        resource_id: 6, 
        value: 3
    },
    {
        task_id: 5,
        id: 1617254693946, 
        delay: 3, duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00", 
        mode: "fixedDuration", 
        resource_id: 6, 
        value: 6
    }
]
~~~

Each object contains the following properties:

- **id** - (*string | number*) - the id of the assignment
- **task_id** - (*string | number*) - the ID of the task the resource is assigned to
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
- [getResourceAssignments](api/method/getresourceassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Resource Management](guides/resource-management.md#assigningresources)

### Change log
- added in v7.1


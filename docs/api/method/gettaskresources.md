---
sidebar_label: getTaskResources
title: getTaskResources method
description: "returns the array of unique resources assigned to a specific task from the datastore"
---

# getTaskResources

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Returns the array of unique resources assigned to a specific task from the datastore

@signature: getTaskResources: (taskId: string | number) =\> ResourceItem[]

### Parameters

- `taskId` - (required) *string | number* -    the task id

### Returns
- ` param` - (ResourceItem[]) - an array of resource objects

### Example

~~~jsx
gantt.getTaskResources(5); // -> see details
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 The **getTaskResources** method is not available if [process_resource_assignments](api/config/process_resource_assignments.md) is disabled. 
:::

The method returns an array with **resourceItem** objects that have the following properties:

- **id** - (*string | number*) - the ID of the resource item
- **open?** - (*boolean*) - indicates whether the resource item is expanded in the tree (*true*) or collapsed (*false*)
- **parent?** - (*string | number*) - the ID of the resource item's parent
- **text?** - (*string*) - the resource name
- **unit?** - (*string*) - the unit for the assignments
- **[customProperty: string]** - (*any*) - any custom property


~~~js
[
    {id: 6, text: "John", parent:1, unit: "hours/day" },
    {id: 7, text: "Mike", parent:2, unit: "hours/day" }
]
~~~

### Related API
- [getResourceAssignments](api/method/getresourceassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Resource Management](guides/resource-management.md#assigningresources)

### Change log
- added in v8.0


---
sidebar_label: resource_assignment_store
title: resource_assignment_store config
description: "specifies the name of the dataStore which stores resource assignments"
---

# resource_assignment_store

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the name of the dataStore which stores resource assignments

@signature: resource_assignment_store: string

### Example

~~~jsx
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);
~~~

**Default value:** "resourceAssignments"

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

The datastore is created automatically.

The datastore is only created when the [process_resource_assignments](api/config/process_resource_assignments.md) config is enabled.

The datastore can be used to modify resource assignments from the code:

~~~js
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});
assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// after assignments are updated in the datastore, you need 
// to call `updateTaskAssignments` to write changes to the task object:
gantt.updateTaskAssignments(taskId);
~~~

### Related API
- [updateTaskAssignments](api/method/updatetaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Resource Management](guides/resource-management.md)

### Change log
- added in v7.1


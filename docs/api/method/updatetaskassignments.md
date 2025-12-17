---
sidebar_label: updateTaskAssignments
title: updateTaskAssignments method
description: "updates the resource property of the task object with the values of the resource assignments from the datastore"
---

# updateTaskAssignments

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Updates the resource property of the task object with the values of the resource assignments from the datastore

@signature: updateTaskAssignments: (taskId: number | string) =\> void

### Parameters

- `taskId` - (required) *number | string* - the task id

### Example

~~~jsx
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

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details
:::note
note This method is only available when the [process_resource_assignments](api/config/process_resource_assignments.md) config is enabled. 
:::

By default, the store of assignments is populated from the task objects. It means, that if you modify the resource property of the task object (e.g. task.users), the changes will be automatically reflected in the data store.

~~~js
task[gantt.config.resource_property] = [
    {
        resource_id: "6",
        value: 3,
        start_date: "03-04-2019 00:00",
        end_date: "05-04-2019 00:00",
    }
];
gantt.updateTask(taskId);
~~~


You may need to refresh the data of the assignments in the opposite direction. For instance, to modify the resource assignments using the datastore API and then to apply the changes to the task object. In this case, you need to update the resource property of the task object with the values from the datastore by calling the **gantt.updateTaskAssignments()** method:

~~~js
var taskId = 2;
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);
assignmentStore.addItem({
    task_id: taskId,
    resource_id: 3,
    value: 8,
    delay: 1
})
gantt.updateTaskAssignments(taskId);


console.log(gantt.getTask(taskId));
// -> { id: 2, users: [{resource_id: 3, value: 8, delay: 1, start_date: ...}], ...)
~~~

### Related API
- [resource_assignment_store](api/config/resource_assignment_store.md)
- [resource_property](api/config/resource_property.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Resource Management](guides/resource-management.md#managingresourceassignments)

### Change log
- added in v7.1


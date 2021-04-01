updateTaskAssignments
=============

@short: updates the resource property of the task object with the values from the datastore of the resource assignments  
	

@params:
- taskId	number|string	the task id




@example:
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

@template:	api_method
@descr:
By default, the store of assignments is populated from the task objects. It means, that if you modify the resource property of a task (e.g. task.users), the changes will be reflected in the datastore automatically.

If you want to refresh the assignment info in the opposite direction, you need to update the resource property of a task from the datastore, you need to call the **gantt.updateTaskAssignments()** method.
This is useful when you modify the resource assignments using the datastore API and want to apply these changes to the task object:

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

@changelog: added in v7.1

@related:
desktop/resource_management.md

@relatedapi: api/gantt_resource_assignment_store_config.md

@relatedsample: 11_resources/13_resource_assignments_for_days.html
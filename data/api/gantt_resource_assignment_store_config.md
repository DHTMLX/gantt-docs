resource_assignment_store
=============



@short: specifies the name of the dataStore which stores resource assignments
	

@type: string
@default: "resourceAssignments"

@example:
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

@template:	api_config
@descr:

The datastore is created automatically.

The datastore is only created when the api/gantt_process_resource_assignments_config.md config is enabled.

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

@changelog: added in v7.1

@relatedapi: 
api/gantt_updatetaskassignments.md
api/gantt_process_resource_assignments_config.md

@related:
desktop/resource_management.md

@relatedsample:
11_resources/13_resource_assignments_for_days.html
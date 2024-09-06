getTaskAssignments
=============


@short: returns the parsed resource assignments of a specific task from the datastore
	

@params:
- taskId	string | number	the task id



@returns:
- param	ResourceAssignment[]	an array of objects with the resource assignments of the task

@example:
gantt.getTaskAssignments(5); // -> see details

@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note The **getTaskAssignments** method is not available if api/gantt_process_resource_assignments_config.md is disabled.}}

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

- <span class=subproperty>**id**</span> - (*string | number*) - the id of the assignment
- <span class=subproperty>**task_id**</span> - (*string | number*) - the ID of the task the resource is assigned to.
- <span class=subproperty>**resource_id**</span> - (*string | number*) - the ID of the resource that is assigned to the task.
- <span class=subproperty>**value**</span> - (*number | string*) - the quantity of the resource assigned to a task
- <span class=subproperty>**delay**</span> - (*number*) - the difference between the assignment start date and the task start date
- <span class=subproperty>**start_date**</span> - (*Date*) - the date the assignment is should start.
- <span class=subproperty>**end_date**</span> - (*Date*) - the date the assignment is should end.
- <span class=subproperty>**duration**</span> - (*number*) - the duration of the assignment
- <span class=subproperty>**mode**</span> - (*string*) - the calculation mode of the time of the resource assignment: "default"|"fixedDates"|"fixedDuration"
- <span class=subproperty>**[customProperty: string]**</span> - (*any*) - any custom property.


{{note *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* will be populated automatically only when api/gantt_process_resource_assignments_config.md is enabled.}}

@relatedapi: 
api/gantt_getresourceassignments.md
api/gantt_process_resource_assignments_config.md

@related: desktop/resource_management.md#assigningresources

@relatedsample: 11_resources/13_resource_assignments_for_days.html

@changelog: added in v7.1

@edition: pro
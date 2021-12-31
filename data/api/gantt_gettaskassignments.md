getTaskAssignments
=============


@short: returns the parsed resource assignments of a specific task from the datastore
	

@params:
- taskId	string|number	the task id



@returns:
- param	array	an array of objects with the resource assignments of the task

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

- *task_id* - the id of the task
- *id* - the id of the assignment
- *delay* - the difference between the assignment start date and the task start date
- *duration* - the duration of the assignment
- *start_date* - the date the assignment is scheduled to start
- *end_date* - the date the assignment is scheduled to be completed
- *mode* - the calculation mode of the time of the resource assignment: "default"|"fixedDates"|"fixedDuration"
- *resource_id* - the id of the resource
- *value* - the quantity of the resource assigned to a task

{{note *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* will be populated automatically only when api/gantt_process_resource_assignments_config.md is enabled.}}

@relatedapi: 
api/gantt_getresourceassignments.md
api/gantt_process_resource_assignments_config.md

@related: desktop/resource_management.md#assigningresources

@relatedsample: 11_resources/13_resource_assignments_for_days.html

@changelog: added in v7.1

@edition: pro
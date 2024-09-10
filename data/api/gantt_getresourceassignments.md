getResourceAssignments
=============

@short:
	returns all tasks assigned to the resource

@params:
- resourceId		string,number		the id of the resource
* taskId		string,number		the id of the task


@returns:
- assignments		ResourceAssignment[]		an array of objects with tasks assigned to the resource


@example:
gantt.getResourceAssignments("6"); // -> see details



@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

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

- <span class=subproperty>**id**</span> - (*string | number*) - the id of the assignment
- <span class=subproperty>**task_id**</span> - (*string | number*) - the ID of the task the resource is assigned to.
- <span class=subproperty>**resource_id**</span> - (*string | number*) - the ID of the resource that is assigned to the task.
- <span class=subproperty>**value**</span> - (*number | string*) - the quantity of the resources assigned to a task
- <span class=subproperty>**delay**</span> - (*number*) - the difference between the assignment start date and the task start date
- <span class=subproperty>**start_date**</span> - (*Date*) - the date the assignment should start
- <span class=subproperty>**end_date**</span> - (*Date*) - the date the assignment should end
- <span class=subproperty>**duration**</span> - (*number*) - the duration of the assignment
- <span class=subproperty>**mode**</span> - (*string*) - the calculation mode of the time of the resource assignment: "default"|"fixedDates"|"fixedDuration"
- <span class=subproperty>**[customProperty: string]**</span> - (*any*) - any custom property



{{note *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* will be populated automatically only when api/gantt_process_resource_assignments_config.md is enabled. }}

@related:
desktop/resource_management.md

@relatedsample:
11_resources/09_resource_histogram.html
11_resources/10_resource_histogram_workload_percents.html
11_resources/12_work_and_material_resources.html

@relatedapi: 
api/gantt_gettaskassignments.md
api/gantt_process_resource_assignments_config.md

@changelog: the return object will contain the *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* properties starting from v7.1

@edition: pro
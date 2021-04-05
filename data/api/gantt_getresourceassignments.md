getResourceAssignments
=============

@short:
	returns all tasks assigned to the resource

@params:
- resourceId		string,number		the id of the resource


@returns:
- assignments		array		an array of objects with tasks assigned to the resource


@example:
gantt.getResourceAssignments("6"); // -> see details



@template:	api_method
@descr:
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

- *task_id* - the id of the task
- *resource_id* - the id of the resource
- *value* - the quantity of the resource assigned to a task
- *delay* - the difference between the assignment start date and the task start date
- *duration* - the duration of the assignment
- *start_date* - the date the assignment is scheduled to start
- *end_date* - the date the assignment is scheduled to be completed
- *id* - the id of the assignment
- *mode* - the calculation mode of the time of the resource assignment: "default"|"fixedDates"|"fixedDuration"

{{note *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* will be populated automatically only when api/gantt_process_resource_assignments_config.md is enabled }}

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
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
	{task_id: 5, resource_id: "6", value: 5},
	{task_id: 18, resource_id: "6", value: 2},
	{task_id: 19, resource_id: "6", value: 3},
	{task_id: 21, resource_id: "6", value: 5}
]
~~~

Each object contains the following properties:

- *task_id* - the id of the task
- *resource_id* - the id of the resource
- *value* - the quantity of the resource assigned to a task

@related:
desktop/resource_management.md

@relatedsample:
11_resources/09_resource_histogram.html
11_resources/10_resource_histogram_workload_percents.html
11_resources/12_work_and_material_resources.html

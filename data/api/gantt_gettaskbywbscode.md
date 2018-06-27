getTaskByWBSCode
=============


@todo:
	check, add to the article 

@short:
	returns a task by its WBS code

@params:

- code		string		the WBS code of the task	

@returns:

- task 		object		a task object

@example:
var task = gantt.getTaskByWBSCode("1");
// => {id:"t1", text:"Task #1, unscheduled: true, duration: 1, …}

@template:	api_method
@descr:

@related:
desktop/specifying_columns.md#wbscode
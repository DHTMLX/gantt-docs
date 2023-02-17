getTaskByWBSCode
=============

@short:
	returns a task by its WBS code

@params:

- code		string		the WBS code of the task	

@returns:

- task 		Task		a task object

@example:
var task = gantt.getTaskByWBSCode("1.2");
// => {id:"t1", text:"Task #1, unscheduled: true, duration: 1, …}

@template:	api_method
@descr:

@related:
desktop/specifying_columns.md#wbscode

@relatedapi:
api/gantt_getwbscode.md

@relatedsample: 07_grid/09_wbs_column.html
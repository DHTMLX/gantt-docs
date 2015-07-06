getTaskRowNode
=============
@short:returns the HTML element of the task row in the table
	
@params:
- id	string, number	the task id

@returns:
node	HTMLElement		the HTML element of the task row

@example:
var taskId = gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.getTaskRowNode(10);//-><div class=​"gantt_row" task_id=​"2">​…​</div>​


@template:	api_method
@descr:


@relatedapi:
	api/gantt_gettasknode.md
    api/gantt_gettask.md
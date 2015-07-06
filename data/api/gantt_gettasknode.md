getTaskNode
=============
@short:returns the HTML element of the task bar 
	
@params:
- id	string, number	the task id

@returns:
node	HTMLElement		the HTML element of the task bar



@example:
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.getTaskNode(10);//-><div task_id=​"2" class=​"gantt_task_line" ​…​​>​​…​</div>​

@template:	api_method
@descr:

@relatedapi:
	api/gantt_gettaskrownode.md
    api/gantt_gettask.md

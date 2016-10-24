showTask
=============
@short:makes the specified task visible on the screen
	

@params:
- id	string, number	the task id


@example:
var taskId = gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.showTask(10);

@template:	api_method
@descr:

@relatedapi:
api/gantt_showdate.md
api/gantt_scrollto.md

api/gantt_getscrollstate.md
api/gantt_onganttscroll_event.md
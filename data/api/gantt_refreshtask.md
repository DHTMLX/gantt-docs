refreshTask
=============
@short: refreshes the task and its related links
	

@params:
- id	string, number	the task id



@example:
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

var task = gantt.getTask(10);

task.text = "Task #10"; /*!*/
gantt.refreshTask(10);       /*!*/

@template:	api_method
@descr:

@relatedapi:
	api/gantt_refreshlink.md
    api/gantt_refreshdata.md
@related:
	desktop/crud_task.md
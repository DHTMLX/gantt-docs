refreshTask
=============

@short: refreshes the task and its related links
	

@params:
- id				string, number			the task id
* refresh_links		boolean					optional, defines whether links related to the task should be refreshed, <em>true</em> by default



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

You can use this method to repaint a task after changing its properties. Unlike api/gantt_updatetask.md, this method does not trigger the [DataProcessor](desktop/server_side.md), and no updates will be sent to the server.

@relatedapi:
	api/gantt_refreshlink.md
    api/gantt_refreshdata.md
    api/gantt_updatetask.md
    api/gantt_updatelink.md
@related:
	desktop/crud_task.md
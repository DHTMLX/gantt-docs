updateTask
=============
@short:updates the specified task
	

@params:
- id	string	the task id

@example: 
var taskId = gantt.addTask({
	id:10,
    text:"Task #10",
    start_date:"02-04-2013",
    duration:8,
    parent:1
});

gantt.getTask(taskId).text = "Task #13"; //changes task's data
gantt.updateTask(taskId); //renders the updated task


@related:
	desktop/server_side.md#updatingdataontheserver
@relatedapi:
	api/gantt_updatelink.md
@template:	api_method
@descr:

The method invokes the api/gantt_onaftertaskupdate_event.md method.
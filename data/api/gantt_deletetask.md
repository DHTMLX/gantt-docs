deleteTask
=============
@short: deletes the specified  task
	

@params:
- id	string,number	the task's id

@example:
gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2013",
    duration:28
});

gantt.deleteTask(10); /*!*/ 


@template:	api_method
@descr:
The method invokes the api/gantt_onbeforetaskdelete_event.md and api/gantt_onaftertaskdelete_event.md events.
@related:
	desktop/crud_task.md
@relatedapi:
	api/gantt_addtask.md, api/gantt_deletelink.md
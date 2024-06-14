changeTaskId
=============
@short:changes the task's id
	
@params: 
- id	string | number	the current task's id
- new_id	string | number	the new task's id





@example:
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.changeTaskId(10, 15); //changes the task's id '10 -> 15' /*!*/


@template:	api_method
@descr:
The method invokes the api/gantt_ontaskidchange_event.md event.
@relatedapi:
	api/gantt_ontaskidchange_event.md
	api/gantt_changelinkid.md
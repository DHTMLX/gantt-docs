onTaskCreated
=============

@short:fires when a user creates a new task by pressing the'+' button in a grid, or when the api/gantt_createtask.md method is called

@params:
- task		Task		the object of a new task

@returns:  
  - result     boolean       returning `false` will cancel the creation of a new task, returning `true` will continue the default processing
 
@example:
gantt.attachEvent("onTaskCreated", function(task){
    task.projectId = 1;
    return true;
});

@template:	api_event
@descr:
The event fires before a new task is displayed, which allows you to **set default values** or **cancel the creation** of a task.

By the time this event is fired, the new task is already available in the datastore via the api/gantt_gettask.md method.

If the event handler returns `false`, the task will be removed from the datastore without firing the api/gantt_onaftertaskdelete_event.md event.

The final order of events that fire when you create a task with the api/gantt_createtask.md method is:

1. api/gantt_ontaskcreated_event.md
2. api/gantt_onbeforelightbox_event.md
3. api/gantt_onlightbox_event.md
4. api/gantt_onafterlightbox_event.md
5. api/gantt_onaftertaskadd_event.md
6. api/gantt_onbeforetaskadd_event.md

@relatedapi:
	api/gantt_createtask.md
	api/gantt_columns_config.md
	
onTaskCreated
=============
@short:fires when user creates a new task by pressing '+' button in a grid, and also when the api/gantt_createtask.md method is called

@params:
- task		object		the object of the new task

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onTaskCreated", function(task){
    //any custom logic here
    return true;
});

@template:	api_event
@descr:
Note, the event fires before the new task is added to the dataset that allows you to cancel saving of this task at all,for example, if the user clicks 'Cancel' button in the lightbox.

The final order of events that fire when you create a task with the api/gantt_createtask.md method:

1. api/gantt_ontaskcreated_event.md
2. api/gantt_onbeforelightbox_event.md
3. api/gantt_onlightbox_event.md
4. api/gantt_onafterlightbox_event.md
5. api/gantt_onaftertaskadd_event.md
6. api/gantt_onbeforetaskadd_event.md

@relatedapi:
	api/gantt_createtask.md
	api/gantt_columns_config.md
	
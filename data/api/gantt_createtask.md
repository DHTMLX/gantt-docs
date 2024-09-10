createTask
=============
@short:adds a new task and opens the lightbox to confirm
	
@params:
* task			NewTask			optional, the task object
* parent		string | number			optional, the parent's id
* index			number			optional, the position the task will be added into (0 or greater)


@returns:
- id	string, number	the task's id	


@example:
var taskId = gantt.createTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2", 2);

@template:	api_method

@descr:
If you set the *index* parameter with the value from 0 and greater, a task will be added to the specified position in the branch. 
Otherwise, the task will be added to the end of the tasks' branch.

The method invokes the api/gantt_ontaskcreated_event.md event. Note, the event fires before the new task is added to the dataset that allows you 
to cancel saving of this task at all,for example, if the user clicks 'Cancel' button in the lightbox.



The final order of events that fire when you create a task with the createTask() method:

1. api/gantt_ontaskcreated_event.md
2. api/gantt_onbeforelightbox_event.md
3. api/gantt_onlightbox_event.md
4. api/gantt_onafterlightbox_event.md
5. api/gantt_onaftertaskadd_event.md
6. api/gantt_onbeforetaskadd_event.md


@related:
	desktop/crud_task.md
@relatedapi:
	api/gantt_ontaskcreated_event.md
	api/gantt_addtask.md

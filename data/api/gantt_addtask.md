addTask
=============

@short:adds a new task


@params:
- task			NewTask			the task object
* parent		string | number			optional, the parent's id
* index			number			optional, the position the task will be added into (0 or greater)


@returns:
- id	string, number	the task's id

@example:
var taskId = gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2", 1);
@template:	api_method
@descr:
If you set the *index* parameter with the value from 0 and greater, a task will be added to the specified position in the branch. 
Otherwise, the task will be added to the end of the tasks' branch.

The method invokes the api/gantt_onbeforetaskadd_event.md and api/gantt_onaftertaskadd_event.md events.

Note, if you don't want to save task in case, for example,  the user clicks the "Cancel" button in the lightbox, 
use the api/gantt_createtask.md method and the api/gantt_ontaskcreated_event.md event that this method invokes.



###Preventing from adding tasks to certain levels
A quite easy way to prevent users from adding sub-tasks to specific tasks is to hide the 'Add'  button through CSS.

<ol>
<li>First, assign a CSS class for each task row using the api/gantt_grid_row_class_template.md template:
~~~js
gantt.templates.grid_row_class = function( start, end, task ){
	if ( task.$level > 1 ){
		return "nested_task"
	}
	return "";
};
~~~
</li>
<li>Then, hide the 'Add' button for such rows:

~~~css
.nested_task .gantt_add{
	display: none !important;
}
~~~
</li>
</ol>
{{sample
	08_api/11_project_structure.html
}}

@related:
	desktop/crud_task.md
@relatedapi:
	api/gantt_createtask.md
	api/gantt_addlink.md
    api/gantt_onaftertaskadd_event.md
    api/gantt_onbeforetaskadd_event.md
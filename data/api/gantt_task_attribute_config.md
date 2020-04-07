task_attribute
=============

@short:sets the name of the attribute that will specify the id of the task's HTML element
	
@default:"data-task-id"
@type: string
@example:
gantt.config.task_attribute = "data-task-id"

@template:	api_config
@descr:
HTML elements of tasks with the default **task_attribute** (*data-task-id* ) look like this:

<img src="api/data_task_id.png"/>

The *task_id* attribute is included to remain backward compatibility with previous versions.

@relatedapi:
api/gantt_locate.md
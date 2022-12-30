setParent
=============


@short:
	set the parent for a task

@params:

- task		object				the task object
- pid		number, string				the parent task id



@example:
gantt.setParent(gantt.getTask(2), 20);
gantt.updateTask(2);


@template:	api_method
@descr:


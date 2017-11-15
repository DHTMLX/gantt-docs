getTaskByIndex
=============


@todo:
	check 

@short:
	returns a task configuration object by its index

@params:

- index		number		the task index in the tree(zero-based numbering)

@returns:
- task		object 		a task configuration object

@example:
var task = gantt.getTaskByIndex(1); 
// -> {id: 1, text: "Task name", type: "project", order: "10", progress: 0.4, …}


@template:	api_method
@descr:


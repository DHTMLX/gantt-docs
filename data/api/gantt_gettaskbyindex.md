getTaskByIndex
=============

@short:
	returns a task by its global task index

@params:

- index		number | string		the task index in the tree (zero-based numbering)

@returns:

- task		Task 		a task object

@example:
var globalTaskIndex = gantt.getGlobalTaskIndex(19); // -> 10

var task = gantt.getTaskByIndex(10); 
// -> {id:"19", text:"Task name", type:"project", order:"10", progress:0.4, …}


@template:	api_method
@descr:

@relatedapi:
api/gantt_getglobaltaskindex.md
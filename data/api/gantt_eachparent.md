eachParent
============= 

@short:
	iterates over all parent tasks of the specified task in the Gantt chart

@params:

- code 			function				a function that will iterate over tasks. Takes a task object as a parameter
- startTask		string | number			the id of the item the parent tasks of which should be iterated over
* master		object					the object, that 'this'  will refer to



@example:
gantt.eachParent(function(task){
	alert(task.text);
}, taskId);

@template:	api_method
@descr:

@relatedapi: api/gantt_calculatetasklevel.md
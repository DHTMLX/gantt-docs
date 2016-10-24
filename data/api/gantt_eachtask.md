eachTask
=============
@short: iterates over specified tasks in the Gantt chart
	

@params:
- code 	function	a function that will iterate over tasks. Takes a task object as a parameter
* parent	string, number	the parent id. If specified, the function will iterate over childs of the <br> specified parent	
* master	object	the object, that 'this'  will refer to





@example:
gantt.eachTask(function(task){alert(task.text);})
@template:	api_method
@descr:

@relatedapi:
	api/gantt_eachselectedtask.md
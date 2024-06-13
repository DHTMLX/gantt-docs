eachTask
=============

@short: iterates over all child tasks of a specific task or the of whole Gantt chart 
	

@params:
- code 		function				a function that will iterate over tasks. Takes a task object as a parameter
* parent	string | number			the parent id. If specified, the function will iterate over children of the <br> specified parent	
* master	object					the object, that 'this'  will refer to



@example:
gantt.eachTask(function(task){alert(task.text);})
@template:	api_method
@descr:
The method uses [depth-first tree traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR)) from left to right to iterate over all tasks. Each parent node is visited before its child.

@relatedapi:
	api/gantt_eachselectedtask.md
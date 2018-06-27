isSplitTask
=============


@todo:
	check 

@short:
	checks whether the specified task is split

@params:

- task		object			the object of a task

@returns:
- isSplit		boolean			true, if the task is split, false otherwise

@example:
var isSplit = gantt.isSplitTask({
	"id": 13, 
    "text": "Task #2", 
    "start_date": "03-04-2018 00:00", 
    "type": "project", 
    "render":"split", 
    "parent": "11", "progress": 0.5, 
    "open": false, 
    "duration": 11
});
// => true


@template:	api_method
@descr:

@related:
desktop/splitted_tasks.md
isTaskExists
=============
@short:checks whether the specified task exists
	
@params:
- id	string, number	the task id


@returns:
- task	boolean		<i>true</i>, if such a task exists. Otherwise, <i>false</i>



@example:
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.isTaskExists(10); // ->true
@template:	api_method
@descr:

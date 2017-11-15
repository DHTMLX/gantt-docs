isSummaryTask
=============


@todo:
	check 

@short:
	checks whether the specified task is summary

@params:
- id	string,number	the task/link id

@returns:
- mode		boolean		<i>true</i>, if the task is summary. Otherwise, <i>false</i>


@example:
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.isSummary(10); // ->false


@template:	api_method
@descr:


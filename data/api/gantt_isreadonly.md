isReadonly
=============

@short:
checks whether the specified task or link is read-only

@params:
* id	string,number	the task/link id


@returns:
- mode		boolean		<i>true</i>, if such a task/link is readonly. Otherwise, <i>false</i>



@example:
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.isReadonly(10); // ->false


@template:	api_method
@descr:

@related:
desktop/readonly_mode.md#readonlymodeforspecifictaskslinks
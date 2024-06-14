isReadonly
=============

@short:
checks whether the specified task/link, or the whole Gantt is read-only

@params:
* item	number | string | Task | Link	optional, the id or an object of the task/link. If not specified, the method checks whether the Gantt is read-only


@returns:
- mode		boolean		<i>true</i>, if a task/link, or the Gantt is readonly. Otherwise, <i>false</i>



@example:
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.isReadonly(10); // ->false

// or 
gantt.isReadonly(gantt.getTask(10)); // -> false


@template:	api_method
@descr:

@related:
desktop/readonly_mode.md#readonlymodeforspecifictaskslinks
isSummaryTask
=============

@short:
	checks whether the specified task is summary

@params:
- task		object		the object of a task

@returns:
- mode		boolean		<i>true</i>, if the task is summary. Otherwise, <i>false</i>


@example:
var task = gantt.getTask(10);
gantt.isSummaryTask(task); // ->false


@template:	api_method
@descr:

{{note
The method makes sense only in the Pro version. Otherwise, the method will return false.
Read the details in the desktop/task_types.md#projecttasks article.
}}

isSummaryTask
=============

@short:
	checks whether the specified task is summary

@params:
- task		Task		the object of a task

@returns:
- mode		boolean		<i>true</i>, if the task is summary. Otherwise, <i>false</i>


@example:
const task = gantt.getTask(10);
gantt.isSummaryTask(task); // ->false


@template:	api_method
@descr:

{{pronote
The method works only in the PRO version, since the possibility to specify the type of a task is available in that version only. Otherwise, the method will return false.
}}

@related:
desktop/task_types.md

@edition:pro
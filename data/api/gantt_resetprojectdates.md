resetProjectDates
=============

@short:re-calculates the duration of a project task depending on the dates of its children
@edition:pro

@params:
- task		object		the task's object


@relatedapi: 
	api/gantt_getsubtaskdates.md

@example:
gantt.resetProjectDates(gantt.getTask(3));

@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

The method modifies the **start_date**, **end_date** and **duration** properties of the provided object.



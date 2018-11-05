isUnscheduledTask
=============


@short:
	checks if the task is unscheduled 

@params:

- task			object			the task's object

@returns:
- value	boolean	'true' if the specified task is unscheduled, 'false' otherwise 

@example:

var isUnscheduled = gantt.isUnscheduledTask(task);

@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note The method requires the **ext/dhtmlxgantt_auto_scheduling.js** to be included on the page.}}

@related:
desktop/auto_scheduling.md

@edition:pro
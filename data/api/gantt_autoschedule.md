autoSchedule
=============

@short:
	recalculates the schedule of the project

@require:auto_scheduling

@params:
* taskId		string,number		optional, the task id 

@example:
gantt.autoSchedule();


@template:	api_method
@descr:

To recalculate the schedule starting from a particular task, pass the id of the task as an argument to the **autoSchedule()** method:

~~~js
gantt.autoSchedule(taskId);
~~~

{{pronote This functionality is available in the PRO edition only.}}

{{note The method requires the **ext/dhtmlxgantt_auto_scheduling.js** to be included on the page.}}

@related:
desktop/auto_scheduling.md

@edition:pro


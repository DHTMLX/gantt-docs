autoSchedule
=============

@short:
	recalculates the schedule of the project

@params:
* taskId		string,number		optional, the task id 

@example:

gantt.autoSchedule();


@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

To recalculate the schedule starting from a particular task, pass the id of the task as an argument to the **autoSchedule()** method:
~~~js
gantt.autoSchedule(taskId);
~~~

@related:
desktop/auto_scheduling.md

@edition:pro
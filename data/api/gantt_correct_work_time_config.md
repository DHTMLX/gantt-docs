correct_work_time
=============
@short:enables adjusting the task's start and end dates to the work time (while dragging) 
	

@type: boolean
@default:false
@example:
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
 
gantt.init("gantt_here");

@template:	api_config
@descr:
The property has a sense only if the api/gantt_work_time_config.md property is enabled.

<br>

<img src="api/correct_work_time.png"/>

@relatedsample:
	09_worktime/05_adjust_to_worktime.html
@related:
	desktop/working_time.md
@relatedapi:
	api/gantt_work_time_config.md
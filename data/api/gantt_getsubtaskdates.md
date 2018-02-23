getSubtaskDates
=============

@short:calculates the combined start/end dates of tasks nested in a project or another task

@params:
* task_id		string,number		the task's id, api/gantt_root_id_config.md will be used if not specified

@returns:
- dates			object		object containing <b>start_date</b> and <b>end_date</b> properties


@example:
//duration of the whole project
var dates = gantt.getSubtaskDates(),
	dateToStr = gantt.templates.task_date;
    
console.log(dateToStr(dates.start_date) + " - " + dateToStr(dates.end_date));

//duration of the subproject
var dates = gantt.getSubtaskDates(1),
	dateToStr = gantt.templates.task_date;
    
console.log(dateToStr(dates.start_date) + " - " + dateToStr(dates.end_date));


@template:	api_method

@descr:
The method returns object containing the start date of the earliest subtask and end date of the latest subtask.

@relatedapi:
api/gantt_getsubtaskduration.md
api/gantt_gettaskby.md
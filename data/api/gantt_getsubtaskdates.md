getSubtaskDates
=============

@short:calculates the combined start/end dates of tasks nested in a project or another task

@params:
* task_id		string,number		the task's id, api/gantt_root_id_config.md will be used if not specified

@returns:
- dates			object		 	an object containing the <b>start_date</b> and <b>end_date</b> properties


@example:
// duration of the whole project
let dates = gantt.getSubtaskDates();
const dateToStr = gantt.templates.task_date;
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);

// duration of the subproject
dates = gantt.getSubtaskDates(1);
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);


@template:	api_method

@descr:
The method returns an object containing the start date of the earliest subtask and the end date of the latest subtask.

The return object has the following format:

~~~js
{
  start_date: Date|null,
  end_date: Date|null
}
~~~

If a Gantt chart has any scheduled tasks, both properties will have date values. If the Gantt chart is empty or contains only unscheduled tasks, both properties will have `null` values.

@relatedapi:
api/gantt_getsubtaskduration.md
api/gantt_gettaskby.md
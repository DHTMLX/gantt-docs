calculateDuration
=============

@todo:
	check details

@short:
    calculates the duration of a task 

@params:
- start			Date		the date when a task is scheduled to begin
- end			Date	 	the date when a task is scheduled to be completed
* task			object		optional, the object of the task the duration of which should be calculated

@returns:
- duration		number		the duration of a task in units specified by the <a href="api/gantt_duration_unit_config.md">duration_unit</a> option


@example:
gantt.config.work_time = true;
gantt.init("gantt_here");

// calculating the duration for the whole calendar
gantt.calculateDuration(new Date(2013,02,15), new Date(2013,02,25)); /*!*/ //->6

@template:	api_method
@descr:
{{note
If the api/gantt_work_time_config.md option is enabled, the method calculates the task's duration in working time. 
}}

The method can also take as a parameter the configuration object of a time span:

~~~js
var duration = gantt.calculateDuration({start_date:start, end_date:end, task:task});
// or
var duration = gantt.calculateDuration(task);
~~~

@related:
- desktop/working_time.md


@relatedapi:
api/gantt_calculateenddate.md
api/gantt_calculatetasklevel.md
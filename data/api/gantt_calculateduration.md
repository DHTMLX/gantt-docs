calculateDuration
=============
@short:calculates the duration of a task 

@params:
- start	Date	the date when a task is scheduled to begin
- end	Date	 the date when a task is scheduled to be completed


@returns:
-duration	number	the duration of a task in units specified by the <a href="api/gantt_duration_unit_config.md">duration_unit</a> option


@example:
gantt.config.work_time = true;
gantt.init("gantt_here");

gantt.calculateDuration(new Date(2013,02,15), new Date(2013,02,25)); /*!*/ //->48

@template:	api_method
@descr:
{{note
If the api/gantt_work_time_config.md option is enabled, the method calculates the task's duration in working time. 
}}

@relatedapi:
	api/gantt_calculateenddate.md
    api/gantt_calculatetasklevel.md
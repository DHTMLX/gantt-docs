unsetWorkTime
=============


@short:
	unsets a working time in the Gantt Chart

@params:

- config	object	the configuration object of a time span



@example:

gantt.config.work_time = true;
 
//changes the working time of working days from [8,17] to [9,18]
gantt.setWorkTime({ hours:[9,18] });
//unsets the working time
gantt.unsetWorkTime({ hours:[9,18] });

@template:	api_method
@descr:
added in version 4.1

@related:
desktop/working_time.md#unsettingtheworkingtime

@relatedapi:
	api/gantt_work_time_config.md
	api/gantt_setworktime.md
	api/gantt_isworktime.md
    
@relatedsample:
	09_worktime/01_working_hours_per_day.html
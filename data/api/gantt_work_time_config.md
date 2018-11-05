work_time
=============
@short:enables calculating the duration of tasks in working time instead of calendar time

	

@type: boolean
@default:false
@example:
//calculates duration in working hours and hides non-working time from the chart
gantt.config.duration_unit = "hour";
gantt.config.work_time = true;

gantt.init("gantt_here");

@template:	api_config
@descr:


@relatedsample:
	09_worktime/02_working_days.html
    09_worktime/01_working_hours_per_day.html
@related:
	 desktop/working_time.md
@relatedapi:
	api/gantt_correct_work_time_config.md
    api/gantt_skip_off_time_config.md
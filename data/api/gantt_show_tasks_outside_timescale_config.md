show_tasks_outside_timescale
=============

@short: enables showing tasks that are outside the specified date range in the Gantt chart
	
@default: false

@type: boolean
@example:
gantt.config.start_date = new Date(2019, 02, 31);
gantt.config.end_date = new Date(2019, 03, 09);
gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here");

@template:	api_config
@descr:


@relatedsample: 01_initialization/20_tasks_outside_timescale.html

@changelog: added in v6.3

@relatedapi: api/gantt_start_date_config.md
	api/gantt_end_date_config.md

@related: 
	desktop/configuring_time_scale.md#tasksoutsidetimescale
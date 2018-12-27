min_duration
=============
@short: Sets the minimum duration (in milliseconds) that can be set for a task during resizing.
@default:60*60*1000, or 3600000 ms, 1 hour

@type:number 
@example:
gantt.config.min_duration = 24*60*60*1000; // (1 day)

@template:	api_config
@descr:
- Config value specifies time span between start and end dates of task <b>(task.start_date - task.end_date)</b>, the value is not affected by [working time settings](desktop/working_time.md) or [duration calculations](api/gantt_calculateduration.md). 

@related:
	desktop/dnd.md
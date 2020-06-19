duration_unit
=============
@short:sets the duration unit
	

@type: string
@default:"day" 
@example:
gantt.config.duration_unit = "hour";//an hour
gantt.config.duration_step = 3; 
//so if task.duration = 2, the task will long 6 hours 

@template:	api_config
@descr:
If you want to have different duration units for different tasks, i.e. to show durations of some tasks in hours and some tasks in "days", you can use the [formatter module](desktop/working_time.md#taskdurationindecimalformat). 

In such scenario, **duration_unit** must be set to the smallest duration your tasks may have:

~~~js
gantt.config.duration_step = 1;
gantt.config.duration_unit = "minute";

// or

gantt.config.duration_step = 1;
gantt.config.duration_unit = "hour";
~~~

And the formatter plugin will allow you to display durations in units you need. The end users will also be able to enter durations in different units.

<br>
If you specify the duration unit to "hour" or "minute" we recommend setting the [duration_step](api/gantt_duration_step_config.md) to 1.
Such combination activates certain optimizations for calculations of working time, that works only when the step is set to 1. Note, that there are major performance differences between "optimized" and "non-optimized" modes.

@values: "minute", "hour", "day", "week", "month", "year"

@relatedapi:
 api/gantt_duration_step_config.md

 @related: desktop/working_time.md#taskdurationindecimalformat
 @relatedsample: 09_worktime/09_decimal_durations.html


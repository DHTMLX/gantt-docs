duration_step
=============
@short:sets the number of 'gantt.config.duration_unit' units that will correspond to one  unit of the 'duration' data property. 
	

@type: number
@default:1
@example:
gantt.config.duration_unit = "hour";
gantt.config.duration_step = 3; 
//so if task.duration = 2, the task will long 6 hours (3*2)

@template:	api_config
@descr:
If you specify the duration unit to "hour" or "minute" we recommend setting the [duration_step](api/gantt_duration_step_config.md) to 1.
Such combination activates certain optimizations for calculations of working time, that works only when the step is set to 1. Note, that there are major performance differences between "optimized" and "non-optimized" modes.

@relatedapi:
 api/gantt_duration_unit_config.md


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
@relatedapi:
 api/gantt_duration_unit_config.md


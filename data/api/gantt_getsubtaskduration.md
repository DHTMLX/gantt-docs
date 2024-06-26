getSubtaskDuration
=============

@short:
	calculates the combined duration of tasks nested in a project or another task. 

@descr:
Calculates the combined duration of tasks nested in a project or another task.

Tasks of the [project type](api/gantt_types_config.md) are not counted in the total duration.

The return value is calculated in [duration units](api/gantt_duration_unit_config.md) from the config.




@params:
* task_id		string | number		the task's id, api/gantt_root_id_config.md will be used if not specified

@returns:
- duration			number		total duration of nested tasks

@example:

const formatter = gantt.ext.formatters.durationFormatter();
//duration of the whole project
let duration = gantt.getSubtaskDuration();
    
console.log(formatter.format(duration));

//duration of the subproject
duration = gantt.getSubtaskDates(1);
    
console.log(formatter.format(duration));

@template:	api_method

@related:
desktop/formatters_ext.md#durationformatter

@relatedapi:
api/gantt_getsubtaskdates.md
api/gantt_gettaskby.md

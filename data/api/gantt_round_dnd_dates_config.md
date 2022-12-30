round_dnd_dates
=============
@short:enables rounding the task's start and end dates to the nearest scale marks
	

@type: boolean
@default:true
@example:
gantt.config.round_dnd_dates = false;
gantt.init("gantt_here");

@template:	api_config
@descr:
If you disable the property, Gantt will round the start and end dates of the dragged task to the nearest hour not to the nearest scale marks. In this case, you may use the [time_step](api/gantt_time_step_config.md) property to configure the step for dragging a task. See the example:

{{editor	https://snippet.dhtmlx.com/bd7ir3w7	Gantt. Drag'n'drop of tasks with the minimum step 
}}





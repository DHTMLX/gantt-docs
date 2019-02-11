onScaleAdjusted
=============
@short:fires when the scale is re-rendered in order to display all tasks completely 
	


@example:
gantt.attachEvent("onScaleAdjusted", function(){
	var min = gantt.getState().min_date,
	max = gantt.getState().max_date,
	to_str = gantt.templates.task_date;

	return gantt.message("Scale shows days from " + to_str(min) 
    + " to " + to_str(max));
});

@template:	api_event
@relatedsample:
	03_scales/08_scale_autoconfig.html
@relatedapi:
	api/gantt_fit_tasks_config.md
@descr:

Note, the event will fire only if the api/gantt_fit_tasks_config.md property is set to *true*.
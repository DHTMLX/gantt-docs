timeline_cell_class
=============

@short: specifies the CSS class that will be applied to the cells of the timeline area
	

@params:
- item		Task | object		either the task's or resource's object assigned to the row
- date		Date		the date of a cell

@returns:
- text		string | void		css class for item in question

@example:
<style>
.weekend{ background: #f4f7f4 !important;}
</style>

gantt.templates.timeline_cell_class = function(task,date){
	if(date.getDay()==0||date.getDay()==6){
		return "weekend";
	}
};

@relatedapi:
	api/gantt_scale_cell_class_template.md
    api/gantt_task_row_class_template.md
    api/gantt_task_class_template.md
	api/gantt_timeline_placeholder_config.md
@relatedsample:
	04_customization/06_highlight_weekend.html
@related:
	desktop/timeline_templates.md
	desktop/highlighting_time_slots.md
	desktop/working_time.md
@template:	api_template

@descr:
Note that while using [work time calculations](desktop/working_time.md), you can use api/gantt_isworktime.md instead of hardcoded values:

~~~js
gantt.config.work_time = true;

gantt.templates.timeline_cell_class = function(task,date){
	if(!gantt.isWorkTime({task:task, date:date}))
		return "weekend";
};
~~~



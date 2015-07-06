task_cell_class
=============

@short: specifies the CSS class that will be applied to the cells of the timeline area
	

@params:
- item	Date	the task object assigned to the row 
- date	Date	the date of a cell



@example:
<style>
.weekend{ background: #f4f7f4 !important;}
</style>
~~~
~~~js
gantt.templates.task_cell_class = function(item,date){
	if(date.getDay()==0||date.getDay()==6){
		return "weekend";
	}
};

@relatedapi:
	api/gantt_scale_cell_class_template.md
    api/gantt_task_row_class_template.md
    api/gantt_task_class_template.md
@relatedsample:
	04_customization/06_highlight_weekend.html
@related:
	desktop/timeline_templates.md
	desktop/highlighting_time_slots.md
@template:	api_template
@returns:
- text		string		css class for item in question
@descr:



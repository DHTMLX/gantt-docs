scale_cell_class
=============
@short:specifies the CSS class that will be applied to cells of the time scale of the timeline area 
	
@params:
- date	Date	the date of a cell



@example:
<style>
.weekend{ background: #f4f7f4 !important;}
</style>
~~~
~~~js
gantt.templates.scale_cell_class = function(date){
	if(date.getDay()==0||date.getDay()==6){
		return "weekend";
	}
};

@template:	api_template
@returns:
- text		string		css class for item in question
@descr:
@relatedapi:
    api/gantt_scale_row_class_template.md
	api/gantt_task_cell_class_template.md
@related:
 	desktop/timeline_templates.md
	desktop/highlighting_time_slots.md
@relatedsample:
	04_customization/06_highlight_weekend.html


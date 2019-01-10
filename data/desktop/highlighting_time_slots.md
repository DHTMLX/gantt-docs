Highlighting  Time Slots
=======================================
To pay user's attention to specific time slot(s), you may highlight them. 

- To highlight a cell of the timeline area, use the api/gantt_task_cell_class_template.md template.
- To highlight a cell of the timeline's time scale, use the api/gantt_scale_cell_class_template.md template.

The template is a function that goes over all the dates and applies the specified CSS class to the related cells.

<img src="desktop/highlighting_weekends.png"/>

For example, you can highlight weekends to visually divide the scale into weeks:

~~~js
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
gantt.templates.task_cell_class = function(task,date){
	if(date.getDay()==0||date.getDay()==6){ 
		return "weekend" ;
	}
};
gantt.init("gantt_here");
~~~

Note, that if you use [work time calculations](desktop/working_time.md) you can use api/gantt_isworktime.md instead of hardcoded values:

~~~js
gantt.config.work_time = true;

gantt.templates.scale_cell_class = function(date){
	if(!gantt.isWorkTime(date)){
		return "weekend";
	}
};
gantt.templates.task_cell_class = function(task,date){
	if(!gantt.isWorkTime({task:task, date:date})){
		return "weekend" ;
	}
};
gantt.init("gantt_here");
~~~


{{sample
	04_customization/06_highlight_weekend.html
}}

{{note
Use the 'important' keyword to guarantee that the specified CSS property will be applied to the cell
}}

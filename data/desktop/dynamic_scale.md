Changing the Scale Settings Dynamically
===============================================
Changing the scale on-the-fly helps you to make a Gantt chart flexible - able to fit to the user's needs. <br> For example, 
a manager has a 1-year project. To get the whole picture of the project, it's better for him to see the project in months. But to know the details of a specific task, it’s more suitable to have the project scheduled by weeks or days.  <br>
Which unit to choose? All of them! And give users a possibility to choose by themselves which one to apply.

<br>

To change a scale's setting (e.g. step, sub-scale) dynamically (after dhtmlxGantt is initialized), use the following technique:

1. Set new values for the related configuration option(s).<br> *For example, to change the scale's unit from "week" to "month" - use the api/gantt_scale_unit_config.md property*
2. Redefine the related template (if required). <br> *For example, to highlight weekends in the scale - use the api/gantt_scale_cell_class_template.md template*
2. Redraw the Gantt chart with the api/gantt_render.md method.

{{snippet
	Dynamic changing of the scale configuration
}}
~~~js
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");

gantt.config.scale_unit = "day"; /*!*/
gantt.config.date_scale = "%d %M, %D"; /*!*/
gantt.templates.scale_cell_class = function(date){/*!*/
	if(date.getDay()==0||date.getDay()==6){/*!*/
    	return "weekend";/*!*/
	}/*!*/
};/*!*/
gantt.render(); /*!*/
~~~
{{sample
	03_scales/05_dynamic_scales.html
}}



Dynamic Change of Scale Settings 
=================================

Changing the scale on-the-fly helps you to make a Gantt chart flexible - able to fit to the user's needs. 

For example, a manager has a 1-year project. To get the whole picture of the project, it's better for him to see the project in months. But to know the details of a specific task, 
it's more suitable to have the project scheduled by weeks or days.

Which unit to choose? All of them! And give users a possibility to choose by themselves which one to apply.


##Configuration settings

To change a scale's setting (e.g. step, sub-scale) dynamically (after dhtmlxGantt is initialized), use the following technique:

1. Set new values for the related configuration option(s).<br> *For example, to change the scale's unit from "month" to "day", use the **unit** property of the api/gantt_scales_config.md property*.
2. Redefine the related template (if required). <br> *For example, to [highlight weekends in the scale](desktop/highlighting_time_slots.md), use the api/gantt_scale_cell_class_template.md template*.
2. Redraw the Gantt chart with the api/gantt_render.md method.

{{snippet
	Dynamic changing of the scale configuration
}}
~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
];

gantt.init("gantt_here");


gantt.config.scales = [							/*!*/
    {unit: "day", step: 1, format: "%d %M, %D"} /*!*/
];												/*!*/
gantt.templates.scale_cell_class = function(date){/*!*/
	if(date.getDay()==0||date.getDay()==6){/*!*/
    	return "weekend";/*!*/
	}/*!*/
};/*!*/
gantt.render(); /*!*/
~~~



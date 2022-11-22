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

Note that while using [work time calculations](desktop/working_time.md), you can use api/gantt_isworktime.md instead of hardcoded values:

~~~js
gantt.config.work_time = true;

gantt.templates.scale_cell_class = function(date){
   	if(!gantt.isWorkTime(date))
      	return true;
};
~~~

If you have specified several scales via the [gantt.config.scales](api/gantt_scales_config.md) property, the template will be applied only to the first scale. To specify the CSS class to the cells of any other scale, use the **css** attribute of the [gantt.config.scales](api/gantt_scales_config.md) property:

~~~js
gantt.config.scales = [
    { unit: "month", step: 1, date: "%F" },
    { unit: "week", step: 1, date: "%W" },
    {
        unit: "day", step: 1, date: "%d", css: function (date) { /*!*/
            if (!gantt.isWorkTime({ date: date })) { /*!*/
                return "weekend"; /*!*/
            } /*!*/
        } /*!*/
    },
];
~~~


@relatedapi:
    api/gantt_scale_row_class_template.md
	api/gantt_timeline_cell_class_template.md
@related:
 	desktop/timeline_templates.md
 	desktop/custom_scale.md
	desktop/highlighting_time_slots.md
	desktop/working_time.md
    desktop/configuring_time_scale.md#styling
@relatedsample:
	04_customization/06_highlight_weekend.html


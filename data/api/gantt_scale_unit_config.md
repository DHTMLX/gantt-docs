scale_unit
=============

@deprecated:Use the **unit** property of the api/gantt_scales_config.md instead:

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css:daysStyle }
];
~~~   

@short:sets the unit of the time scale (X-Axis)
	
    
@type: string
@example:
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");

@relatedsample:
	03_scales/02_month_days.html
@related:
	desktop/configuring_time_scale.md#settingtheunitofthescale
@relatedapi:
	api/gantt_date_scale_config.md
    api/gantt_step_config.md
@template:	api_config

@descr:
There is a possiblity to set a custom unit. Read more on the topic [here](desktop/configuring_time_scale.md#customtimeunits).

@default:'day'

@values: "minute", "hour", "day", "week", "quarter", "month", "year"

@changelog: deprecated since v6.2

@todo:check
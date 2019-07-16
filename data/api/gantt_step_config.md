step
=============

@short: sets the step of the time scale (X-Axis)
	
@deprecated:Use the **step** property of the api/gantt_scales_config.md instead:

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css:daysStyle }
];
~~~        

@type: number
@example:
gantt.config.scale_unit = "year";
gantt.config.step = 1;
gantt.config.date_scale = "%Y";

gantt.init("gantt_here");

@default:1
@related:
	desktop/configuring_time_scale.md#settingthestepofthescale
@relatedsample:
	03_scales/03_full_year.html
@relatedapi:
	api/gantt_scale_unit_config.md
    api/gantt_date_scale_config.md
@template:	api_config
@descr:

@changelog: deprecated since v6.2

@todo:check
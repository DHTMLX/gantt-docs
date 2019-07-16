date_scale
=============

@short:sets the format of the time scale (X-Axis)
	
@deprecated:Use the **format** property of the api/gantt_scales_config.md instead:

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css:daysStyle }
];
~~~    


@type: string
@example:	
gantt.config.scale_unit = "month";
gantt.config.step = 1;
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");

@related:
	desktop/configuring_time_scale.md#settingthescalesformat
    desktop/date_format.md
@relatedapi:
	api/gantt_scale_unit_config.md
	api/gantt_step_config.md
@relatedsample:	
	03_scales/01_multiple_scales.html
@default:"%d %M"
@template:	api_config
@descr:

@changelog: deprecated since v6.2



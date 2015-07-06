date_scale
=============
@short:specifies the date format of the time scale (X-Axis)
	
@params:
- date	Date	the date which needs formatting

@example:
gantt.templates.date_scale = function(date){
	return gantt.date.date_to_str(gantt.config.date_scale)(date);
};


@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:

@relatedapi:
	api/gantt_date_scale_config.md
@related:
	desktop/timeline_templates.md
	desktop/configuring_time_scale.md#settingthescalesformat



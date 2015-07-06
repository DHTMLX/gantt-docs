tooltip_date_format
=============
@short:specifies the format of start and end dates displayed in the tooltip

@params:
- date	Date	the date which needs formatting

@example:
gantt.templates.tooltip_date_format=function (date){
	var formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
};

@require:tooltip

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:


@relatedapi:
	api/gantt_tooltip_text_template.md
@related:
    desktop/tooltip_templates.md
    desktop/tooltips.md
api_date
=============

@short:specifies the format of dates that are set by means of API methods. Used to parse incoming dates
	
@params:
- date	Date	the date which needs formatting

@example:
gantt.templates.api_date = function(date){
	return gantt.date.str_to_date(gantt.config.api_date);
};

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:


@related:
	desktop/conversion_templates.md
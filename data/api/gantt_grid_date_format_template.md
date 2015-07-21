grid_date_format
=============

@short:
	specifies the format of dates in the "Start time" column
    
@params:
- date			Date		the date which needs formatting

@example:
gantt.templates.grid_date_format = function(date){
    return gantt.date.date_to_str(gantt.config.date_grid)(date);
};

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:


@related:
	desktop/table_templates.md
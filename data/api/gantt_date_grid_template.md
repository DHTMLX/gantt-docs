date_grid
=============
@short:specifies the format of dates in the "Start time" column 
	

@params:
- date	Date	the date which needs formatting

@example:
gantt.templates.date_grid = function(date){
    return gantt.date.date_to_str(gantt.config.date_grid)(date);
};

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:

@relatedapi:
	api/gantt_date_grid_config.md
@related:
	desktop/table_templates.md
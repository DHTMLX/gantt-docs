grid_date_format
=============

@short:
	specifies the format of dates in the "Start time" column
    
@params:
- date			Date		the date which needs formatting
- column			string 			name of the column that called the template

@example:
gantt.templates.grid_date_format = function(date, column){
    return gantt.date.date_to_str(gantt.config.date_grid)(date);
};

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:

@relatedapi:
	api/gantt_task_end_date_template.md

@related:
	desktop/table_templates.md
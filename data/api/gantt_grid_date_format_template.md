grid_date_format
=============

@short:
	specifies the format of dates for the columns that show dates (return the `Date` values)
    
@params:
- date			Date		the date which needs formatting
* column		string 		the name of the column that called the template

@example:
gantt.templates.grid_date_format = function(date, column){
    return gantt.date.date_to_str(gantt.config.date_grid)(date);
};

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:
The template function is called for all tasks, except for the unscheduled ones. 

{{note The **grid_date_format** template is used only by the api/gantt_date_grid_template.md template, so if you make some changes in it, **grid_date_format** will be affected.}}


@relatedapi:
	api/gantt_task_end_date_template.md

@related:
	desktop/table_templates.md
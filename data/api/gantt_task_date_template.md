task_date
=============
@short: specifies the date format of the label in the 'Time period' section of the lightbox
	
@params:
- date	Date	the date which needs formatting

@example:
gantt.templates.date_grid = function(date){
    return gantt.date.date_to_str(gantt.config.task_date)(date);
};



@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:
@relatedapi:
	api/gantt_task_date_config.md
@related:
	desktop/lightbox_templates.md

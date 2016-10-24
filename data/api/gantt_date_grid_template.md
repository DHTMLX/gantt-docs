date_grid
=============
@short:
	specifies the content of start date or end date columns in grid
	

@params:
- date			Date		the date which needs formatting
- task			object 			the task object

@example:
gantt.templates.date_grid = function(date, task){
   if(task && gantt.isUnscheduled(task) && gantt.config.show_unscheduled){
    	return gantt.templates.task_unscheduled_time(task);
   	}else{
    	return gantt.templates.grid_date_format(date);
   }
}

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:

@relatedapi:
	api/gantt_date_grid_config.md
@related:
	desktop/table_templates.md
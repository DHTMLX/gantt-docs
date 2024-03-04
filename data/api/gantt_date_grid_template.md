date_grid
=============
@short:
	specifies the content of columns that show dates (return `Date` values) in grid
	

@params:
- date			Date			the date which needs formatting
- task			Task 			the task object
- column		string 			the name of the column that called the template

@example:
gantt.templates.date_grid = function(date, task, column){
   if(task && gantt.isUnscheduledTask(task) && gantt.config.show_unscheduled){
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
	api/gantt_grid_date_format_template.md
@related:
	desktop/table_templates.md
    
@relatedsample:
https://snippet.dhtmlx.com/87j43fc3		Gantt. Setting the format of columns with dates in grid
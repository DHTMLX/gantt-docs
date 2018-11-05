task_row_class
=============

@short:
	specifies the CSS class that will be applied to the row of the timeline area
	
@params:
- start		Date		the date when a task is scheduled to begin  
- end		Date		the date when a task is scheduled to be completed
- task		object	 	the task object

@example:
gantt.templates.task_row_class = function(start, end, task){
	return "";
};

@template:	api_template
@returns:
- text		string		CSS class for the item in question
@descr:
Returns the CSS class for the item in question.

@related:
	desktop/timeline_templates.md
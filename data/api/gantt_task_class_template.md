task_class
=============

@short:specifies the CSS class that will be applied to task bars
	
@params:
- start		Date		the date when a task is scheduled to begin  
- end		Date		the date when a task is scheduled to be completed
- task		Task	 	the task object

@example:
gantt.templates.task_class = function(start, end, task){return "";};


@template:	api_template
@returns:
- text		string | void		a CSS class for the item in question
@descr:

@related:
	desktop/timeline_templates.md
task_time
=============
@short:specifies the date period in the header of the lightbox
	

@params:
- start		Date	the date when a task is scheduled to begin  
- end	Date	the date when a task is scheduled to be completed
- task	object	 the task object

@example:
gantt.templates.task_time = function(start,end,task){
	return gantt.templates.task_date(start)+" - "+gantt.templates.task_date(end);
};

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:


@related:
	desktop/lightbox_templates.md
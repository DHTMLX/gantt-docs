task_text
=============
@short:specifies the text in the task bars and the header of the lightbox
	
@params:
- start		Date	the date when a task is scheduled to begin  
- end	Date	the date when a task is scheduled to be completed
- task	Task	 the task object

@example:
gantt.templates.task_text=function(start, end, task){
	return task.text;
};
@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:


@related:
	desktop/timeline_templates.md
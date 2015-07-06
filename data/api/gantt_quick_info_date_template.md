quick_info_date
=============
@short:specifies the date of the pop-up edit form
	
@params: 
- start	Date	the date when a task is scheduled to begin
- end	Date	the date when  a task is scheduled to be completed
- task	object	the task object
@require:quick_info


@example:
gantt.templates.quick_info_date = function(start, end, task){
       return gantt.templates.task_time(start, end, task);
};
@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:

@related:
	desktop/touch_templates.md
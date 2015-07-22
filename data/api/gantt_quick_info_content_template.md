quick_info_content
=============
@short:specifies the content of the pop-up edit form

@params: 
- start	Date	the date when a task is scheduled to begin
- end	Date	the date when a task is scheduled to be completed
- task	object	the task object
@require:quick_info

@example:
gantt.templates.quick_info_content = function(start, end, task){ 
       return task.details || task.text;
};

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:

@related:
	desktop/touch_templates.md
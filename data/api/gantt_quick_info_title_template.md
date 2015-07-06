quick_info_title
=============

@short:specifies the title of the pop-up edit form
	
@params: 
- start	Date	the date when a task is scheduled to begin
- end	Date	the date when a task is scheduled to be completed
- task	object	the task object

@require:quick_info


@example:
gantt.templates.quick_info_title = function(start, end, task){ 
       return ev.text.substr(0,50); 
};

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:

@related:
	desktop/touch_templates.md
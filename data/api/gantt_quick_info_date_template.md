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

{{note This template is defined in the **Quick Info** extension, so you need to activate the [quick_info](desktop/extensions_list.md#quickinfo) plugin.}}



@related:
	desktop/touch_templates.md

@relatedsample:
02_extensions/01_quickinfo.html
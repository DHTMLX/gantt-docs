leftside_text
=============
@short:specifies the text assigned to tasks bars on the left side
	

@params: 
- start	Date	the date when a task is scheduled to begin
- end	Date	the date when a task is scheduled to be completed
- task	Task	the task object

@example:
gantt.templates.leftside_text = function(start, end, task){
	return task.duration + " days";
};



@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:



@relatedapi:
	 api/gantt_rightside_text_template.md
@related:
	desktop/timeline_templates.md
	desktop/text_block_for_task.md
@relatedsample:
	04_customization/01_outer_content.html
leftside_text
=============
@short:specifies the text assigned to tasks bars on the left side
	

@params: 
- start	Date	the date when a task is scheduled to begin
- end	Date	the date when a task is scheduled to be completed
- task	Task	the task object

@example:

const formatter = gantt.ext.formatters.durationFormatter({
    format: ["day"]
});

gantt.templates.leftside_text = function(start, end, task){
    return formatter.format(task.duration);
};



@template:	api_template
@returns:
- text		string | number | void		html text which will be rendered in the gantt
@descr:



@relatedapi:
	 api/gantt_rightside_text_template.md
@related:
	desktop/timeline_templates.md
	desktop/text_block_for_task.md
	desktop/formatters_ext.md#durationformatter
@relatedsample:
	04_customization/01_outer_content.html
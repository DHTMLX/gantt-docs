grid_row_class
=============
@short:specifies the CSS class that will be applied to a grid row

@params: 
- start	Date	the date when a task is scheduled to begin
- end	Date	the date when a task is scheduled to be completed
- task	object	the task object

@example:
gantt.templates.grid_row_class = function(start, end, task){
	return "";
};

@template:	api_template
@returns:
- text		string		css class for item in question
@descr:

@related:
	desktop/table_templates.md
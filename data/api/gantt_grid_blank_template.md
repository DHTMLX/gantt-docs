grid_blank
=============
@short:specifies the custom content inserted before the labels of child items in the tree column
	

@params:
- task	object	the task object


@example:
gantt.templates.grid_blank = function(item) {
	return "<div class='gantt_tree_icon gantt_blank'></div>";
};

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@related:
	desktop/table_templates.md
	desktop/tree_column.md
@descr:

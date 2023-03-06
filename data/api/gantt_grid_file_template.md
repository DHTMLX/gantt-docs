grid_file
=============
@short:specifies the icon of child items in the tree column
	

@params:
- task	Task	the task object


@example:
gantt.templates.grid_file = function(item) {
	return "<div class='gantt_tree_icon gantt_file'></div>";
};

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@related:
	desktop/table_templates.md
	desktop/tree_column.md
@descr:



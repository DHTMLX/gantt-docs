grid_indent
=============
@short:specifies the indent  of the child items in a branch (in the tree column)
	

@params:
- task	Task	the task object

@example:
gantt.templates.grid_indent = function(item) {
	return "<div class='gantt_tree_indent'></div>";
};
@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt

@related:
	desktop/tree_column.md
	desktop/table_templates.md
@descr:


grid_open
=============
@short:specifies the icon of the open/close sign in the tree column
	
@params:
- task	object	the task object

@example:
gantt.templates.grid_open = function(item) {
	return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:


@related:
	desktop/tree_column.md
	desktop/table_templates.md
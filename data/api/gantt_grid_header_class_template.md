grid_header_class
=============
@short:specifies the CSS class that will be applied to the headers of the table's columns
	
@params:
- columnName		string			the column's name (as specified in the "name" property of the column object)
- column			object			column object (as specified in the <i>gantt.config.columns</i> config)


@example:
gantt.templates.grid_header_class = function(columnName, column){
	return "";
};
@template:	api_template
@returns:
- text		string | void		css class for the item in question
@descr:


@related:
	desktop/table_templates.md
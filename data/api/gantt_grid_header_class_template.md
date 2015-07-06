grid_header_class
=============
@short:specifies the CSS class that will be applied to the headers of the table's columns
	
@params:
- column	object	the column's configuration object
- config	string	the column's id ('name' attribute)


@example:
gantt.templates.grid_header_class = function(column, config){
	return "";
};
@template:	api_template
@returns:
- text		string		css class for item in question
@descr:


@related:
	desktop/table_templates.md
getGridColumn
=============
@short: gets the configuration object of a column

@params:
- name	string |number	the column's name

@returns:
- column	object	the column's object

@example:
gantt.config.columns = [
	{ name:"text", tree:true, width:150},
	{ name:"start_date", align: "center", width:150},
	{ name:"duration", align: "center", width:70},
	{ name:"add", width:44, resize:true, hide:true}
];
gantt.getGridColumn("text");//->{ name:"text", tree:true, width:150}
@template:	api_method
@descr:


@related:
	api/gantt_getgridcolumns.md
@relatedsample:
	02_extensions/07_managing_grid_columns.html
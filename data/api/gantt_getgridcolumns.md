getGridColumns
=============
@short: gets columns of the Gantt chart
	

@returns:
- columns	GridColumn[]	an array of columns 



@example:
gantt.config.columns = [
	{ name:"text", tree:true, width:150},
	{ name:"start_date", align: "center", width:150},
	{ name:"duration", align: "center", width:70},
	{ name:"add", width:44, resize:true, hide:true}
];
gantt.getGridColumns(); //-> [{ name:"text", tree:true, width:150}, {...}, {...}]
@template:	api_method
@descr:

@related:
	api/gantt_getgridcolumn.md
@relatedsample:
	02_extensions/07_managing_grid_columns.html
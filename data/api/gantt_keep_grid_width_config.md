keep_grid_width
=============
@short:'says' to preserve the initial grid's width during resizing the columns within
	
@edition: pro
@type: boolean
@default: false
@example:
gantt.config.columns = [
	{ name:"text", tree:true, width:"*", resize:true },
	{ name:"start_date", align: "center"},
	{ name:"duration", align: "center", width:70 },
	{ name:"add", width:44 }
];

gantt.config.keep_grid_width = true; /*!*/
gantt.init("gantt_here");

@template:	api_config
@relatedsample:
	02_extensions/04_grid_resize.html
@related:
	desktop/specifying_columns.md
@relatedapi:
	api/gantt_grid_resize_config.md
@descr:



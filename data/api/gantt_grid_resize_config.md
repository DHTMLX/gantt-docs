grid_resize
=============
@short:makes the grid resizable by dragging the right grid's border
	
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

gantt.config.grid_resize = true; /*!*/
gantt.init("gantt_here");

@template:	api_config

@relatedsample:
	02_extensions/04_grid_resize.html
@related:
	desktop/specifying_columns.md
@relatedapi:
	api/gantt_keep_grid_width_config.md
    api/gantt_min_grid_column_width_config.md
@descr:
{{pronote This functionality is available in the PRO edition only.}}
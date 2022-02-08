grid_resize
=============

@short:makes the grid resizable by dragging the right grid's border
	
@edition:pro
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

<br>

{{note The property is deprecated. Use the [gantt.config.layout](api/gantt_layout_config.md) instead and specify grid and resizer objects with the necessary configuration inside. Check the details [here](desktop/layout_config.md#defaultlayout).}}

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows:[
    {
      cols: [
        {view: "grid", id: "grid", scrollX:"scrollHor", scrollY:"scrollVer"},
        {resizer: true, width: 1},
        {view: "timeline", id: "timeline", scrollX:"scrollHor", scrollY:"scrollVer"},
        {view: "scrollbar", scroll: "y", id:"scrollVer"}
      ]
     },
    {view: "scrollbar", scroll: "x", id:"scrollHor", height:20}
  ]
};
 
gantt.init("gantt_here");
~~~

@deprecated:
The property is deprecated.


@changelog:
deprecated since version 5.0




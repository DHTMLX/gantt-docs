show_grid
=============
@short:shows the grid area of the Gantt chart
	

@type: boolean
@default:true (the grid is visible)
@example:
//hides the grid area of the Gantt chart
gantt.config.show_grid = false;
gantt.init("gantt_here");

@template:	api_config
@descr:
*gantt.config.show_grid = false* is useful when you need to hide the grid area of the Gantt chart quickly while *gantt.config.show_chart = false* serves to hide the timeline area. If you work in a simple layout, you'd better not use these two options together as it may cause an unexpected result. Instead of it, you should change the configuration of the layout via [gantt.config.layout](api/gantt_layout_config.md).


The **show_grid** config will only work if you have not changed [the default configuration of the layout](desktop/layout_config.md#defaultlayout) via [gantt.config.layout](api/gantt_layout_config.md). In case you have configured a custom layout, then you have to create several custom configurations and to switch between them to hide/show the grid.<br> 
{{editor	https://snippet.dhtmlx.com/omk98l0x	Gantt. Toggle grid (custom layout)}}


@relatedapi:
	api/gantt_show_chart_config.md

@related: desktop/how_to.md#howtotogglegridchart
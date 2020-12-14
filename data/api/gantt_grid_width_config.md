grid_width
=============

@short:sets the width of the grid
	

@type: number
@default: 360
@example:
gantt.config.grid_width = 400;

gantt.init("gantt_here");


@template:	api_config
@descr:

The width of Grid columns depends on two attributes: the [width](api/gantt_columns_config.md) of the column and the width of the grid. If the sum of the width of columns is not equal to the width of the grid, Gantt changes one of the parameters.

- When initializing the gantt via [gantt.init()](api/gantt_init.md), the [width](api/gantt_columns_config.md) of the column is a priority.
- When rendering the gantt via [gantt.render()](api/gantt_render.md), the **grid_width** is a priority. <br> 
{{editor	https://snippet.dhtmlx.com/5/36b6baa89	Adjustment of column width}}
- When initializing the gantt via [gantt.init()](api/gantt_init.md) and either the width of the column is not specified or is set to **'*'**, the **grid_width** is a priority. <br>{{editor	https://snippet.dhtmlx.com/5/a35378204	Adjusting column width}}

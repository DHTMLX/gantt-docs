grid_resizer_attribute
=============
@short:sets the name of the attribute  of the grid resizer's  DOM element
	
@default: "grid_resizer"
@type: string
@example:
gantt.config.grid_resizer_attribute = "gridresizer";

@template:	api_config

@relatedapi:
	api/gantt_grid_resizer_column_attribute_config.md
	api/gantt_grid_resize_config.md

@deprecated:
Use the [grid_resizer_column_attribute](api/gantt_grid_resizer_column_attribute_config.md) instead:

~~~js
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~
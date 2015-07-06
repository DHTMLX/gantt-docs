grid_resizer_column_attribute
=============
@short:sets the name of the attribute  of the column resizer's  DOM element. The attribute presents the column's index
	
@default: "column_index"
@type: string
@example:
gantt.config.grid_resizer_attribute = "col_index";//"column_index" -> "col_index"

@template:	api_config
@descr:
<code>
&#60;div class="gantt_grid_column_resize_wrap" column_index="2" style="top: 0px; height: 35px; left: 308.5px;"&#62;

&#60;div class="gantt_grid_column_resize">&#60;/div&#62;

&#60;/div&#62;
</code>

@relatedapi:
	api/gantt_grid_resizer_attribute_config.md


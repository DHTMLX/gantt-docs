task_grid_row_resizer_attribute
=============

@short:
sets the name of the attribute of the resizer's DOM element of the grid row. The attribute presents the row's index

@type: string
@default: "data-row-index"
@example:
gantt.config.task_grid_row_resizer_attribute = "data-grid-row-index"

@template:	api_config
@descr:
{{note The config is applied when [gantt.config.resize_rows](api/gantt_resize_rows_config.md) is enabled.}}

@relatedsample: 02_extensions/28_row_resize.html

@relatedapi: api/gantt_resize_rows_config.md
@related: desktop/resizing_rows.md
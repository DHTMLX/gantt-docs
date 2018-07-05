resource_render_empty_cells
=============

@short:
	tells the resource timeline to render elements and call templates for non-allocated cells

@descr:
By default, the resource timeline won't call the api/gantt_resource_cell_value_template.md and api/gantt_resource_cell_class_template.md templates for cells that don't have any tasks allocated.

If this option is enabled, templates will be called for all cells of the resource timeline.


@type:
    boolean
    
@example:
gantt.config.resource_render_empty_cells = true;

@relatedapi:
api/gantt_resource_cell_class_template.md
api/gantt_resource_cell_value_template.md

@template:	api_config

@related:
desktop/resource_management.md


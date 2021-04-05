resource_cell_value
=============

@edition: pro


@short:defines the HTML content of resource timeline cells 
	
@params:
- start_date	Date			start date of the scale cell  
- end_date		Date			end date of the scale cell
- resource		object	 		the resource object
- tasks			array			tasks that are assigned to specified resource and overlap start/end dates of the cell
- assignments	array		resource assignments that are assigned to the specified start/end dates of the task

@example:
gantt.templates.resource_cell_value = function(start_date, end_date, resource, tasks,
	assignments){
	return "<div>" + tasks.length * 8 + "</div>";
};

@template:	api_template
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note The "assignments" argument is only awailable when the api/gantt_process_resource_assignments_config.md config is enabled. }}

- Defines the HTML content of resource timeline cells.
- Resource timeline links tasks to a resource by the api/gantt_resource_property_config.md property of the task object.
- The template is not called for cells where no tasks are located, unless api/gantt_resource_render_empty_cells_config.md is enabled.
- Tasks of the [project type](api/gantt_types_config.md) are not counted and won't be passed to the `tasks` argument.


@returns:
- html		string		html string which will inserted into cell's innerHTML

@relatedapi:
api/gantt_resource_property_config.md
api/gantt_resource_render_empty_cells_config.md
api/gantt_resource_cell_class_template.md
api/gantt_process_resource_assignments_config.md

@related: desktop/resource_management.md

@relatedsample:
11_resources\04_resource_usage_diagram.html
11_resources\05_resource_usage_templates.html
11_resources\06_assign_multiple_owners.html
11_resources\12_work_and_material_resources.html

@changelog: the **assignments** parameter is added in v7.1
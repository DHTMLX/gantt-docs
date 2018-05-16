resource_cell_class
=============

@edition: pro

@short:defines the css class names of cells in the resource timeline cells.
	
@params:
- start			Date		start date of the scale cell  
- end			Date		end date of the scale cell
- resource		object	 	resource object
- tasks			array		tasks that are assigned to specified resource and overlap start/end dates of the cell

@example:
gantt.templates.resource_cell_class = function(start_date, end_date, resource, tasks){
	if (tasks.length <= 1) {
		return "workday_ok";
	} else {
		return "workday_over";
	}
};

@template:	api_template
@descr:
{{pronote This functionality is available in the PRO edition only.}}

- Defines the css class names of cells in the resource timeline view.
- Resource timeline links tasks to a resource by api/gantt_resource_property_config.md property of the task object.
- The template is not called for cells where no tasks are located.
- Tasks of the [project type](api/gantt_types_config.md) are not counted and won't be passed to the `tasks` argument.


@returns:
- className		string		string that is appended to cell element className attribute


@relatedapi:
api/gantt_resource_property_config.md

@related: desktop/resource_management.md

@relatedsample:
11_resources/04_resource_usage_diagram.html
11_resources/05_resource_usage_templates.html
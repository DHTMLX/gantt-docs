histogram_cell_label
=============

@short:
	defines the label inside a cell

@params:
- start_date	Date		start date of the scale cell  
- end_date		Date		end date of the scale cell
- resource		object	 	the resource object
- tasks			Array &lt;Task&gt;		tasks that are assigned to the specified resource and overlap start/end dates of the cell
- assignments	array		resource assignments that are assigned to the specified start/end dates of the task

@example:
gantt.templates.histogram_cell_label = function(start_date,end_date,resource,tasks,
    assignments){
    return tasks.length * 8;
};

@returns:
- label		string | number | void		an HTML text for the label inside a histogram cell

@template:	api_template
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note The "assignments" argument is only available when the api/gantt_process_resource_assignments_config.md config is enabled. }}

@edition:pro

@related: desktop/resource_management.md#resourceviewpanel

@relatedapi:
api/gantt_histogram_cell_class_template.md
api/gantt_histogram_cell_allocated_template.md
api/gantt_histogram_cell_capacity_template.md
api/gantt_process_resource_assignments_config.md
api/gantt_resource_property_config.md

@relatedsample:
11_resources/09_resource_histogram.html
11_resources/10_resource_histogram_workload_percents.html
11_resources/13_resource_assignments_for_days.html

@changelog: the **assignments** parameter is added in v7.1
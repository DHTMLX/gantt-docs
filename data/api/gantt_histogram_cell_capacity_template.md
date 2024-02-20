histogram_cell_capacity
=============


@short:
	 specifies the height of the line that defines the available capacity of the resource

@params:
- start_date	Date		start date of the scale cell  
- end_date		Date		end date of the scale cell
- resource		object	 	the resource object
- tasks			Array &lt;Task&gt;		tasks that are assigned to the specified resource and overlap start/end dates of the cell
- assignments	array		resource assignments that are assigned to the specified start/end dates of the task

@example:
gantt.templates.histogram_cell_capacity=function(start_date,end_date,resource,tasks,
    assignments){
    return 24;
};

@template:	api_template

@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note The "assignments" argument is only available when the api/gantt_process_resource_assignments_config.md config is enabled. }}

The value of the template can be set from -1 to maxCapacity. Values less than 0 won't render the line.

**maxCapacity definition**

If each row of the histogram is considered as a bar chart, maxCapacity is the height of the Y-scale of this chart. In the image below maxCapacity = 24:

![maxCapacity](desktop/maxcapacity.png)

By default, **maxCapacity** is 24 for all resources. It means that if you return the value bigger than 24 in the *histogram_cell_capacity* template, the numbers will be calculated correctly, but the area of the cells of the resource panel may not be filled as you expected.

![filled_capacity](desktop/filled_capacity.png)

But there is the ability to configure **maxCapacity** for all histogram at once and for each resource separately. Check the example below:

{{editor	https://snippet.dhtmlx.com/glnqcsgq	Configuring maxCapacity}}

@edition:pro

@related: desktop/resource_management.md#resourceviewpanel

@relatedapi:
api/gantt_histogram_cell_class_template.md
api/gantt_histogram_cell_label_template.md
api/gantt_histogram_cell_allocated_template.md
api/gantt_process_resource_assignments_config.md
api/gantt_resource_property_config.md

@relatedsample:
11_resources/09_resource_histogram.html
11_resources/10_resource_histogram_workload_percents.html
11_resources/13_resource_assignments_for_days.html

@changelog: the **assignments** parameter is added in v7.1
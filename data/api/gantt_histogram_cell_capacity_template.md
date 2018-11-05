histogram_cell_capacity
=============


@short:
	 specifies the height of the line that defines the available capacity of the resource

@params:
- start_date	Date		start date of the scale cell  
- end_date		Date		end date of the scale cell
- resource		object	 	the resource object
- tasks			array		tasks that are assigned to the specified resource and overlap start/end dates of the cell

@example:
gantt.templates.histogram_cell_capacity=function(start_date,end_date,resource,tasks){
    return 24;
};

@template:	api_template

@descr:
{{pronote This functionality is available in the PRO edition only.}}

The value of the template can be set from -1 to maxCapacity. Values less than 0 won't render the line.

**maxCapacity definition**

If each row of the histogram is considered as a bar chart, maxCapacity is the height of the Y-scale of this chart. In the image below maxCapacity = 24:

@edition:pro

@related: desktop/resource_management.md#resourceviewpanel

@relatedapi:
api/gantt_histogram_cell_class_template.md
api/gantt_histogram_cell_label_template.md
api/gantt_histogram_cell_allocated_template.md
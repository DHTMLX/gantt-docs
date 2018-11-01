resource_column_label
=============

@todo:
	check 

@short:
	defines the label inside a cell

@params:
- start_date	Date		start date of the scale cell  
- end_date		Date		end date of the scale cell
- resource		object	 	the resource object
- tasks			array		tasks that are assigned to the specified resource and overlap start/end dates of the cell

@example:
gantt.templates.resource_column_label = function(start_date,end_date,resource,tasks){
    return tasks.length * 8;
};

@template:	api_template
@descr:
{{pronote This functionality is available in the PRO edition only.}}

@edition:pro

@related: desktop/resource_management.md#resourceviewpanel

@relatedapi:
api/gantt_resource_column_class_template.md
api/gantt_resource_column_allocated_template.md
api/gantt_resource_column_capacity_template.md
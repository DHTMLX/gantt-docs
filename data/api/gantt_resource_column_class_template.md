resource_column_class
=============

@todo:
	check 

@short:
	defines the CSS class which is applied to a cell of the resource panel

@params:
- start_date	Date		start date of the scale cell  
- end_date		Date		end date of the scale cell
- resource		object	 	the resource object
- tasks			array		tasks that are assigned to the specified resource and overlap start/end dates of the cell

@example:
gantt.templates.resource_column_class = function(start_date,end_date,resource,tasks){
    return "";
};

@template:	api_template
@descr:
{{pronote This functionality is available in the PRO edition only.}}

@edition:pro

@related: desktop/resource_management.md#resourceviewpanel

@relatedapi:
api/gantt_resource_column_label_template.md
api/gantt_resource_column_allocated_template.md
api/gantt_resource_column_capacity_template.md
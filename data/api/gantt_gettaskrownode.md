getTaskRowNode
=============
@short:returns the HTML element of the task row in the table
	
@params:
- id	string | number	the task id

@returns:
node	HTMLElement		the HTML element of the task row

@example:
const taskId = gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.getTaskRowNode(10);//-><div class=​"gantt_row" task_id=​"2">​…​</div>​


@template:	api_method
@descr:

Please note that when a task is repainted, the old DOM element will be discarded and replaced by a new element. This means that any changes you make to the element will be reset after the next repaint.

If you need to modify the appearance of an element, we recommend using templates as they are the preferred method for customizing the look of Gantt elements.

@related:
    desktop/specifying_columns.md#datamappingandtemplates

@relatedapi:
	api/gantt_gettasknode.md
    api/gantt_gettask.md
    api/gantt_task_text_template.md
    api/gantt_task_class_template.md
    api/gantt_grid_row_class_template.md
onRowDragStart
=============
@short:fires before the user drags a row of the grid 
	

@params:
- id			string,number			the id of the task that the user drags in the grid
- target		string,number			the id of the task which place the dragged row will occupy
- e	 			event					a native event object

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 


@example:
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    //any custom logic here
    return true;
});

@template:	api_event
@descr:

{{note

The event is fired when the task is moved by mouse in the left-hand grid by when api/gantt_order_branch_config.md setting is enabled. If branch reordering is disabled, the event will never be called.

}}


The event is blockable. Return *false* to cancel dragging.

@relatedapi:
	api/gantt_onrowdragend_event.md
	api/gantt_order_branch_config.md

@relatedsample:
	07_grid/02_branch_ordering.html
@related:
	desktop/reordering_tasks.md
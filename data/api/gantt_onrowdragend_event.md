onRowDragEnd
=============

@short:fires after the user drops a row in the grid
	

@params:
- id			string,number		the id of the task that the user has dragged in the grid
- target		string,number		the id of the task which place the dragged row has occupied

@example:
gantt.attachEvent("onRowDragEnd", function(id, target) {
    //any custom logic here
});

@template:	api_event
@descr:


{{note
The event is fired when a task is moved by the mouse pointer in the left-hand grid, while the api/gantt_order_branch_config.md setting is enabled. If branch reordering is disabled, the event will never be called.
}}


@relatedapi:
	api/gantt_onbeforerowdragend_event.md
	api/gantt_onrowdragstart_event.md
	api/gantt_order_branch_config.md

@relatedsample:
	07_grid/02_branch_ordering.html
@related:
	desktop/reordering_tasks.md
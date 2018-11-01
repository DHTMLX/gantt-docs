onBeforeRowDragMove
=============

@todo:
	check 

@short:
	fires before a task is dragged to a different position

@params:
- id			string,number			the id of the task to move
- parent		string,number			the parent id
- tindex		number					the index of the position in the parent branch that the task will be moved to 


@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
gantt.attachEvent("onBeforeRowDragMove", function(id, parent, tindex){
 	// return true/false;
});


@template:	api_event
@descr:
The event is blockable. Return *false* to cancel moving of a row.

{{note The event fires only if the option api/gantt_order_branch_config.md is set to the "marker" value.}}

@relatedapi:
api/gantt_order_branch_config.md
api/gantt_onaftertaskmove_event.md
api/gantt_onbeforetaskmove_event.md
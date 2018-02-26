onTaskMultiSelect
=============

@short:
	fires after the task selection state has changed (the task has been selected/unselected)

@params:
- id		string,number 		the id of a task
- state 	boolean	 			true if the task has been selected, false - if unselected
- e 		Event				a native event object

@example:
gantt.attachEvent("onTaskMultiSelect", function(id, state, e){
	// some logic here
});

@template:	api_event
@descr:
The event is called for each task of the range.

@relatedapi:
api/gantt_onbeforemultiselect_event.md
api/gantt_onbeforetaskmultiselect_event.md
api/gantt_onmultiselect_event.md


@related:
desktop/multiselection.md#apievents

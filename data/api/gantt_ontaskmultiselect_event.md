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

{{note This event is defined in the **multiselect** extension, so you need to activate the [multiselect](desktop/extensions_list.md#multitaskselection) plugin. Read the details in the desktop/multiselection.md article.}}



The event is called for each task of the range.

@relatedapi:
api/gantt_onbeforemultiselect_event.md
api/gantt_onbeforetaskmultiselect_event.md
api/gantt_onmultiselect_event.md


@related:
desktop/multiselection.md#apievents

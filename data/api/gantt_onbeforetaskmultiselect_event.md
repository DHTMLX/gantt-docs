onBeforeTaskMultiSelect
=============

@short:
	fires before the task selection state is being changed (the task is being selected or unselected)

@params:
- id			string,number 		the id of a task
- state 		boolean				true if the task is going to be selected, false - if unselected
- e 			Event				a native event object


@example:
gantt.attachEvent("onBeforeTaskMultiSelect", function(id, state, e){
	// some logic here
     return true;
});


@template:	api_event
@descr:

{{note This event is defined in the **ext/dhtmlxgantt_multiselect.js** extension, so you need to include it on the page. Read the details in the desktop/multiselection.md article.}}




The event is called for each task of the range.

The event is blockable, returning false will cancel the change of the task selection state.

@relatedapi:
api/gantt_onbeforemultiselect_event.md
api/gantt_ontaskmultiselect_event.md
api/gantt_onmultiselect_event.md

@related:
desktop/multiselection.md#apievents
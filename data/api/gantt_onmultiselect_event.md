onMultiSelect
=============

@short:
	fires after selection of a task or a range of tasks has been completed

@params:
- e 		Event			a native event object

@example:
gantt.attachEvent("onMultiSelect", function(e){
	// some logic here
	return true;
});

@template:	api_event
@descr:

@relatedapi:
api/gantt_onbeforemultiselect_event.md
api/gantt_onbeforetaskmultiselect_event.md
api/gantt_ontaskmultiselect_event.md


@related:
desktop/multiselection.md#apievents
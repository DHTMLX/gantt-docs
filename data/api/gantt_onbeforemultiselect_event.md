onBeforeMultiSelect
=============


@short:
	fires before selecting a task or a range of tasks

@params:
- e			Event			a native event object

@example:
gantt.attachEvent("onBeforeMultiSelect", function(e){
	// some logic here
	return true;
});

@template:	api_event
@descr:

{{note This event is defined in the **multiselect** extension, so you need to activate the [multiselect](desktop/extensions_list.md#multitaskselection) plugin. Read the details in the desktop/multiselection.md article.}}



The event is blockable, returning *false* will cancel multiple selection of tasks.

@relatedapi:
api/gantt_onbeforetaskmultiselect_event.md
api/gantt_ontaskmultiselect_event.md
api/gantt_onmultiselect_event.md

@related:
desktop/multiselection.md#apievents
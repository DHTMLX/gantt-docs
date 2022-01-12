onTaskUnselected
=============

@short:fires when the user unselects a task by selecting some other task
	

@params:
- id	string,number	the task id (of the unselected task)


@example:
gantt.attachEvent("onTaskUnselected", function(id){
    //any custom logic here
});

@template:	api_event
@relatedapi:
	api/gantt_onbeforetaskselected_event.md
    api/gantt_ontaskselected_event.md
    
@descr:
The event is called for each task of the multiselection range.

If the [multiselect](desktop/extensions_list.md#multitaskselection) extension is enabled, the event also fires when a user removes selection from the selected task.  
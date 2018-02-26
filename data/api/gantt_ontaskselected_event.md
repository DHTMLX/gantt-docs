onTaskSelected
=============

@short:fires when the user selects a task 
	

@params:
- id	string,number	the task id


@example:
gantt.attachEvent("onTaskSelected", function(id){
    //any custom logic here
});

@template:	api_event
@relatedapi:
	api/gantt_onbeforetaskselected_event.md
    api/gantt_ontaskunselected_event.md
    
@descr:
The event is called for each task of the multiselection range.

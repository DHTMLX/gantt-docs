onTaskClick
=============
@short:fires when the user clicks on a task row in the  grid area (including the 'expand/collapse' and 'add task' buttons) or on a task bar in the timeline area
	

@params:
- id		string		the id of the clicked task
* e		Event		a native event object
@example:
gantt.attachEvent("onTaskClick", function(id,e){
    //any custom logic here
});

@template:	api_event
@descr:

@relatedapi:
	api/gantt_ontaskdblclick_event.md
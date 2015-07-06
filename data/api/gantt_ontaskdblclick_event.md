onTaskDblClick
=============
@short:fires when the user double clicks on a task
	

@params:
- id		string		the id of the double clicked task
* e		Event		a native event object
@example:
gantt.attachEvent("onTaskDblClick", function(id,e){
    //any custom logic here
});

@template:	api_event
@descr:

@relatedapi:
	api/gantt_ontaskclick_event.md
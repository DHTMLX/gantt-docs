onTaskDblClick
=============
@short:fires when the user double clicks on a task
	

@params:
- id		string		the id of the double clicked task
* e		Event		a native event object
@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
gantt.attachEvent("onTaskDblClick", function(id,e){
    //any custom logic here
    return true;
});

@template:	api_event
@descr:
The event is blockable. Returning false will cancel the default handler (opening of task details)

@relatedapi:
	api/gantt_ontaskclick_event.md
onTaskClick
=============
@short:
 fires when the user clicks on a task row in the grid area (including the 'expand/collapse' and 'add task' buttons) or on a task bar in the timeline area
	

@params:
- id			string,number				the id of the clicked task
* e				Event				a native event object

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 


@example:
gantt.attachEvent("onTaskClick", function(id,e){
    //any custom logic here
    return true;
});

@template:	api_event
@descr:
The event is blockable. Returning false will cancel the default handler (selecting a task)

@relatedapi:
	api/gantt_ontaskdblclick_event.md
onBeforeLinkDisplay
=============
@short:fires after the links have been loaded to the Gantt chart but before they are displayed
	

@params:
- id	string, number	the link id
- link	object	the link object

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onBeforeLinkDisplay", function(id, link){
    if (task.type == "1"){
        return true;
    }
    return false;
});

@template:	api_event
@descr:
The event is blockable. Returning false will prevent the link from being displayed

@relatedapi:
	api/gantt_onbeforetaskdisplay_event.md
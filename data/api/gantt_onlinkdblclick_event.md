onLinkDblClick
=============
@short:fires when the user double clicks on a link
	

@params:
- id		string		the id of the clicked link
* e		Event		a native event object
@example:
gantt.attachEvent("onLinkDblClick", function(id,e){
    //any custom logic here
});

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@template:	api_event
@descr:

@relatedapi:
	api/gantt_onlinkclick_event.md
onBeforeLinkDelete
=============
@short: fires before the user deletes a link

@params:
- id		string, number		the link id
- item		object				the link object 

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
 @example:
gantt.attachEvent("onBeforeLinkDelete", function(id,item){
    //any custom logic here
    return true;
});

@relatedapi:	
	api/gantt_deletelink.md
@template:	api_event
@descr:
The event is blockable. Return false to cancel deleting of the link.
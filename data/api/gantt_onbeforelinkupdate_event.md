onBeforeLinkUpdate
=============

@short: fires before a link is updated

@params:
- id	string, number	the link id
- new_item	object	the new (updated)  object of the link 

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onBeforeLinkUpdate", function(id,new_item){
    //any custom logic here
    return true;
});


@relatedapi:
	api/gantt_updatelink.md
    api/gantt_onafterlinkupdate_event.md

@template:	api_event
@descr:
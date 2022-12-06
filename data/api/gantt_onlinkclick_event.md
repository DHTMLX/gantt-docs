onLinkClick
=============
@short:fires when the user clicks on a link
	

@params:
- id		string,number		the id of the clicked link
* e		Event		optional, a native event object
@example:
gantt.attachEvent("onLinkClick", function(id,e){
    //any custom logic here
});

@template:	api_event
@descr:

@relatedapi:
	api/gantt_onlinkdblclick_event.md
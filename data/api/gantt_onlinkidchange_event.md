onLinkIdChange
===========================

@short:fires when the id of a link is changed
	

@params:
- id		string,number	the current link id
- new_id	string,number	the new link id

@example:
gantt.attachEvent("onLinkIdChange", function(id,new_id){
    //any custom logic here
});


@template:	api_event
@descr:
@relatedapi:
	api/gantt_changelinkid.md

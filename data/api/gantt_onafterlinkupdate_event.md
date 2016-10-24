onAfterLinkUpdate
=============

@short: fires after the user updates a link

@params:
- id		string, number			the link id
- item		object					the link object 

@example:
gantt.attachEvent("onAfterLinkUpdate", function(id,item){
    //any custom logic here
});


@relatedapi:
	api/gantt_updatelink.md

@template:	api_event
@descr:

onAfterLinkAdd
=============
@short: fires after a new link is added to the Gantt chart

@params:
- id		string, number			the link id
- item		object					the link object 

@example:
gantt.attachEvent("onAfterLinkAdd", function(id,item){
    //any custom logic here
});


@relatedapi:
	api/gantt_addlink.md

@template:	api_event
@descr:


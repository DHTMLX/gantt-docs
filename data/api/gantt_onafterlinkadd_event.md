onAfterLinkAdd
=============

@short: fires after a new link is added to the Gantt chart

@params:
- id		string,number			the link id
- link		Link					the link object 

@example:
gantt.attachEvent("onAfterLinkAdd", function(id,link){
    //any custom logic here
});


@relatedapi:
	api/gantt_addlink.md

@template:	api_event
@descr:


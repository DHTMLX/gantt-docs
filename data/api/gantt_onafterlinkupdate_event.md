onAfterLinkUpdate
=============

@short: fires after the user updates a link

@params:
- id		string,number			the link id
- link		Link					the link object 

@example:
gantt.attachEvent("onAfterLinkUpdate", function(id,link){
    //any custom logic here
});


@relatedapi:
	api/gantt_updatelink.md

@template:	api_event
@descr:

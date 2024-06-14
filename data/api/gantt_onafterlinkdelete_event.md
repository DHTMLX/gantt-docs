onAfterLinkDelete
=============
@short: fires after the user deletes a link

@params:
- id		string,number			the link id
- link		Link					the link object 

@example:
gantt.attachEvent("onAfterLinkDelete", function(id,link){
    //any custom logic here
});

@relatedapi:	
	api/gantt_deletelink.md
@template:	api_event
@descr:


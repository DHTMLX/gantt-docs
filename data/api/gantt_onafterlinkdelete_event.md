onAfterLinkDelete
=============
@short: fires after the user deletes a link

@params:
- id		string,number			the link id
- item		object					the link object 

@example:
gantt.attachEvent("onAfterLinkDelete", function(id,item){
    //any custom logic here
});

@relatedapi:	
	api/gantt_deletelink.md
@template:	api_event
@descr:


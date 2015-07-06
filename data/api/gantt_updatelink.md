updateLink
=============

@short:updates the specified dependency link
	

@params:
- id	string	the task id

@example: 
gantt.addLink({
	id:5, 
    source:1, 
    target:2, 
    type:1
});

gantt.getLink(5).type = 2; //changes link's data
gantt.updateLink(5); //renders the updated link


@related:
	desktop/server_side.md#updatingdataontheserver
@relatedapi:
	api/gantt_updatetask.md
@template:	api_method
@descr:

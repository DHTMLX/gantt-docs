deleteLink
=============
@short:deletes the specified dependency link
	

@params:
-id		string, number	the dependency link's id




@example:
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

gantt.deleteLink(1); /*!*/   

@relatedapi:
	api/gantt_addlink.md
    api/gantt_deleteTask.md
    api/gantt_onafterlinkdelete_event.md
@related:
	desktop/crud_dependency.md
@template:	api_method
@descr:
The method invokes the api/gantt_onbeforelinkdelete_event.md and api/gantt_onafterlinkdelete_event.md events.

onTaskOpened
=============
@short:fires when a branch has been opened
	
@params:
- id	string, number	the branch id

@example:
gantt.attachEvent("onTaskOpened", function(id) {
	//any custom logic here
});

@template:	api_event
@descr:


@relatedapi:
	api/gantt_open.md
    api/gantt_ontaskclosed_event.md
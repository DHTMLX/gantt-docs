onTaskClosed
=============

@short:fires when a branch has been closed
	

@params:
- id	string, number	the branch id

@example:
gantt.attachEvent("onTaskClosed", function(id) {
	alert("You've closed a branch with id="+id);
});

@template:	api_event
@descr:

@relatedapi:
	api/gantt_close.md
    api/gantt_ontaskopened_event.md
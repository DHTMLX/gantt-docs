addLink
=============
@short:adds a new dependency link
	

@params:
- link	object 	the link object

@returns:
- id	string/number	the link's id
@example:
var linkId = gantt.addLink({
	id:1,
    source:1,
    target:2,
    type:gantt.config.links.finish_to_start
});

@template:	api_method
@descr:
The method invokes the api/gantt_onbeforelinkadd_event.md and api/gantt_onafterlinkadd_event.md events.

@relatedapi:
    api/gantt_updatelink.md
    api/gantt_deletelink.md
	api/gantt_addtask.md
@related:
	desktop/crud_dependency.md

	

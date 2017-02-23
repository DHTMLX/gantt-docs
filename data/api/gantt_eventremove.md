eventRemove
=============

@short: 
	removes an event handler from an HTML element
	

@params:
- id		string		the id of an event handler

@example:
var eventId = gantt.event("divId", "click", function(e){
	do_something();
});

gantt.eventRemove(eventId);

@relatedapi: api/gantt_event.md

@related: desktop/handling_events.md

@template:	api_method
@descr:
@changelog:
added in version 4.0
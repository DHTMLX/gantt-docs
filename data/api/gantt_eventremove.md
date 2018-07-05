eventRemove
=============

@short: 
	removes an event handler from an HTML element
	

@params:
- node				HTMLElement,string			the HTML node or its id
- event				string						the name of an HTML event (without the 'on' prefix)
- handler			function					the event handler
* options			boolean,object				optional, the value of either the <i>useCapture</i> or <i>options</i> parameter. <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener">Read details</a>


@example:
var eventId = gantt.event("divId", "click", function(e){
	do_something();
}, options);

gantt.eventRemove(eventId);

@relatedapi: api/gantt_event.md

@related: desktop/handling_events.md

@template:	api_method
@descr:


@changelog:
added in version 4.0
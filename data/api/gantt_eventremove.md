eventRemove
=============

@short: 
	removes an event handler from an HTML element
	

@params:
- node				HTMLElement | string			the HTML node or its id
- event				string						the name of an HTML event (without the 'on' prefix)
- handler			function					the event handler
* options			boolean | HandlerSettings				optional, the value of either the <i>useCapture</i> or <i>options</i> parameter. <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener">Read details</a>


@example:

const handler = function(event){
	console.log("event!");
};
var element = document.querySelector(".my-element");

gantt.event(element, "click", handler);

gantt.eventRemove(element, "click", handler);

@relatedapi: api/gantt_event.md

@related: desktop/handling_events.md

@template:	api_method
@descr:
All event listeners attached using api/gantt_event.md will be detached automatically when the api/gantt_destructor.md is called.

@changelog:
added in version 4.0
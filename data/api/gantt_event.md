event
=============

@short: attaches an event handler to an HTML element

@params:
- node				HTMLElement,string			the HTML node or its id
- event				string						the name of an HTML event (without the 'on' prefix)
- handler			function					the event handler
* options			boolean,object				optional, the value of either the <i>useCapture</i> or <i>options</i> parameter. <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener">Read details</a>				



@example:
// adds a handler for the 'onclick' event
gantt.event("divId", "click", function(e){
	// e - a native event object
	do_something();
}, options);

@template:	api_method
@descr:


@related:
desktop/handling_events.md

@relatedapi:
api/gantt_eventremove.md

@changelog:
added in version 4.0
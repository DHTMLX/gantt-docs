onLinkValidation
=============

@short:fires when the user adds a new link and dhtmlxGantt checks whether the link is valid
	

@params:
- link	Link	the link object

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or cancelled (<b>false</b>) 

@example:
gantt.attachEvent("onLinkValidation", function(link){
	//any custom logic here
});

@template:	api_event
@descr:
{{note The event fires in the api/gantt_islinkallowed.md method.}}

The event fires when a user creates a new link between tasks by drag-and-drop with the mouse.

If the event handler returns `false`, the round handler of the target task will be colored in red and the link won't be added. Returning `true`
will highlight the round handler in orange and allow creation of a link.


@relatedapi:
	api/gantt_islinkallowed.md

detachEvent
=============
@short:detaches a handler from an event (which was attached before by the attachEvent() method)
	

@params:
@params: 
- id	string	the event's id





@example:
var myEvent = gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});

gantt.detachEvent(myEvent);

@relatedapi:
	 api/gantt_attachevent.md
	
@related:
	desktop/handling_events.md
@template:	api_method
@descr:


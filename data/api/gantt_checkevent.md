checkEvent
=============
@short:checks whether an event has some handler(s) specified
	

@params:
- name	GanttEventName	the event's name


@returns:
isExist	boolean	returns <i>true</i>, if some handler is specified for the event

@example:
gantt.attachEvent("onTaskClick", function(id, e) {
	alert("You've just clicked an item with id="+id);
});
       
gantt.checkEvent("onTaskClick"); //returns 'true'

@relatedapi:
	api/gantt_attachevent.md
@related:
	desktop/handling_events.md
@template:	api_method
@descr:

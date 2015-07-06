attachEvent
=============
@short:attaches the handler to an inner event of dhtmlxGantt
	

@params: 
- name		string		the event's name, case-insensitive
- handler	function	the handler function 

@example: 
gantt.attachEvent("onTaskClick", function(id, e) {
	alert("You've just clicked an item with id="+id);
});

@returns:
event id	string, number	the id of the attached event handler



@template:	api_method
@relatedapi:
	api/gantt_detachevent.md
@related:
	desktop/handling_events.md
@relatedsample:
	08_api/01_dnd_events.html
@descr:

You can attach several handlers to the same event and all of them will be executed.
If some of handlers will return *false* - the related operation will be blocked.
Event handlers are processed in the same order that they were attached.
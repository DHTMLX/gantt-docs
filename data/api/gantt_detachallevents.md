detachAllEvents
=============

@short:detaches all events from dhtmlxGantt (both custom and inner ones)
	
@example:
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("You've just double clicked an item with id="+id);
});

gantt.detachAllEvents();



@related:
	desktop/handling_events.md
@relatedapi:
	api/gantt_detachevent.md
    api/gantt_attachevent.md
@template:	api_method
@descr:
Note, using the **detachAllEvents** method can break the functionality of dhtmlxGantt, as it removes ALL event handlers at a time: those defined by a custom logic and those defined by dhtmlxGantt itself (to link different
parts and functionality). 

A safer approach is to store the result of the api/gantt_attachevent.md method and to use the api/gantt_detachevent.md method to detach saved events when necessary, as shown in the example above.

<br>
{{note The **detachAllEvents** method is deprecated. Instead of it, you can use:}}

~~~
// save handler ids when attaching events
var events = [];
events.push(gantt.attachEvent("onTaskClick", function(id, e) {
	alert("You've just clicked an item with id="+id);
});
events.push(gantt.attachEvent("onTaskDblClick", function(id, e) {
	alert("You've just double clicked an item with id="+id);
});

// detach all saved events
while (events.length)
   gantt.detachEvent(events.pop()); /*!*/
~~~

@deprecated: The method is deprecated.


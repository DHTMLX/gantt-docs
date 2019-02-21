detachAllEvents
=============

@short:detaches all events from dhtmlxGantt (both custom and inner)
	

@example:
var event1 = gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
var event2 = gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("You've just double clicked an item with id="+id);
});

var events = [];
events.push(event1);
events.push(event2);

for (var i=0; i<events.length; i++)
   gantt.detachEvent(events[i]); /*!*/
events = [];



@related:
	desktop/handling_events.md
@relatedapi:
	api/gantt_detachevent.md
    api/gantt_attachevent.md
@template:	api_method
@descr:

Note, using the method can break the funtionality of dhtmlxGantt as it removes ALL event handlers at a time: ones that were defined by a custom logic and ones that were defined by dhtmlxGantt itself (to link different
parts and functionality). 

A safer approach is to store the result of the api/gantt_attachevent.md method and to use the api/gantt_detachevent.md method  against them when necessary as shown in the example above.

@deprecated:
instead of it, you can use
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

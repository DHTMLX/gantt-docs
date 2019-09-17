Event Handling 
===================================

Events help to interact with users and bring interactivity to the page.

When the user makes some action in the Gantt chart, dhtmlxGantt invokes an event. You can use this event to detect the action and run the desired code for it. 


Attaching events
--------------------------------------------

To attach an event, use the api/gantt_attachevent.md method.

~~~js
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
~~~
{{sample
	08_api/01_dnd_events.html
}}

**Note:**

- Events' names are case-insensitive.
- You can attach several handlers to the same event.

Detaching events
-------------------------

To detach an event handler, use the api/gantt_detachevent.md method:

{{snippet
A general way to attach/detach the event handler
}}
~~~js
//to attach event
var eventId = gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
//to detach event
gantt.detachEvent(eventId);/*!*/
~~~

To detach all handlers at once, you can use the following logic:

~~~js
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

Сhecking the existence of a handler
------------------------------------------

To check, whether a specific event has any handlers attached, use the api/gantt_checkevent.md method:

~~~js
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked a task with id="+id);
});
 
gantt.checkEvent("onTaskClick"); //returns 'true' /*!*/
~~~

Cancelable events 
-----------------------

All events with the preceding subword 'onbefore' can be cancelled.

To cancel some event, return **false** from the appropriate event handler.

{{snippet
Cancelling the event handler
}}
~~~js
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, old_task){
	var task = gantt.getTask(id);
	if(mode == gantt.config.drag_mode.progress){
		if(task.progress < old_task.progress){
			dhtmlx.message(task.text + " progress can't be undone!");
			return false; /*!*/
		}
	}
	return true;
});
~~~

{{sample
	08_api/01_dnd_events.html
}}


Accessing the gantt object inside the handler
---------------------------------
Inside the event handler you can refer to the gantt object through the keyword **this**. </br>

{{snippet
Referring within the event handler
}}
~~~js
gantt.attachEvent("onTaskClick", function(id, e){
    parentId = this.getTask(id).parent;
});
~~~

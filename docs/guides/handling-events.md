---
title: "Event Handling"
sidebar_label: "Event Handling"
---

# Event Handling 

Events help to interact with users and bring interactivity to the page.

When the user makes some action in the Gantt chart, dhtmlxGantt invokes an event. You can use this event to detect the action and run the desired code for it. 


## Attaching events

To attach an event, use the [attachEvent](api/method/attachevent.md) method.

~~~js
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
~~~

**Related sample**: [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)


**Note:**

- Events' names are case-insensitive.
- You can attach several handlers to the same event.

## Detaching events

To detach an event handler, use the [detachEvent](api/method/detachevent.md) method:

~~~jsx {6} title="A general way to attach/detach the event handler"
// to attach event
var eventId = gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
// to detach event
gantt.detachEvent(eventId);
~~~

To detach all handlers at once, you can use the following logic:

~~~js {11}
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
   gantt.detachEvent(events.pop()); 
~~~

## Checking the existence of a handler

To check, whether a specific event has any handlers attached, use the [checkEvent](api/method/checkevent.md) method:

~~~js {5}
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked a task with id="+id);
});
 
gantt.checkEvent("onTaskClick"); //returns 'true' 
~~~

## Cancelable events 

All events with the preceding subword 'onbefore' can be cancelled.

To cancel some event, return **false** from the appropriate event handler.

~~~jsx {6} title="Cancelling the event handler"
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, old_task){
    var task = gantt.getTask(id);
    if(mode == gantt.config.drag_mode.progress){
        if(task.progress < old_task.progress){
            dhtmlx.message(task.text + " progress can't be undone!");
            return false; 
        }
    }
    return true;
});
~~~


**Related sample**: [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)


## Accessing the gantt object inside the handler

Inside the event handler you can refer to the gantt object through the keyword **this**. 

~~~jsx title="Referring within the event handler"
gantt.attachEvent("onTaskClick", function(id, e){
    parentId = this.getTask(id).parent;
});
~~~


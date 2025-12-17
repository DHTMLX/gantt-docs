---
sidebar_label: detachAllEvents
title: detachAllEvents method
description: "detaches all events from dhtmlxGantt (both custom and inner ones)"
---

# detachAllEvents

### Description

@short: Detaches all events from dhtmlxGantt (both custom and inner ones)

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("You've just double clicked an item with id="+id);
});

gantt.detachAllEvents();
~~~

### Details

Note, using the **detachAllEvents** method can break the functionality of dhtmlxGantt, as it removes ALL event handlers at a time: those defined by a custom logic and those defined by dhtmlxGantt itself (to link different
parts and functionality). 

A safer approach is to store the result of the [attachEvent](api/method/attachevent.md) method and to use the [detachEvent](api/method/detachevent.md) method to detach saved events when necessary, as shown in the example above.


:::note
The **detachAllEvents** method is deprecated. Instead of it, you can use: 
:::

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

### Related API
- [detachEvent](api/method/detachevent.md)
- [attachEvent](api/method/attachevent.md)

### Related Guides
- [Event Handling](guides/handling-events.md)


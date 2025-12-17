---
sidebar_label: detachEvent
title: detachEvent method
description: "detaches a handler from an event (which was attached before by the attachEvent() method)"
---

# detachEvent

### Description

@short: Detaches a handler from an event (which was attached before by the attachEvent() method

@signature: detachEvent: (id: string) =\> void

### Parameters
- `id` - (required) *string* -  the event's id

### Example

~~~jsx
const myEvent = gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});

gantt.detachEvent(myEvent);
~~~

### Related API
- [attachEvent](api/method/attachevent.md)

### Related Guides
- [Event Handling](guides/handling-events.md)


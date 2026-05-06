---
sidebar_label: detachEvent
title: detachEvent Methode
description: "trennt einen Handler von einem Event (welches zuvor durch die attachEvent() Methode angehängt wurde)"
---

# detachEvent

### Description

@short: Trennt einen Handler von einem Event (welches zuvor durch die attachEvent() Methode angehängt wurde

@signature: detachEvent: (id: string) =\> void

### Parameters
- `id` - (erforderlich) *string* -  die ID des Events

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
---
sidebar_label: detachEvent
title: detachEvent method
description: "Entfernt einen zuvor angehängten Event-Handler (hinzugefügt über die Methode attachEvent())"
---

# detachEvent

### Description

@short: Entfernt einen zuvor angehängten Event-Handler (hinzugefügt über die Methode attachEvent())

@signature: detachEvent: (id: string) =\> void

### Parameters

- `id` - (required) *string* - Die Kennung des Event-Handlers

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
- ["Event-Behandlung"](guides/handling-events.md)


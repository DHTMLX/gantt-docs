---
sidebar_label: checkEvent
title: checkEvent method
description: "prüft, ob für ein bestimmtes Event Handler zugewiesen sind"
---

# checkEvent

### Description

@short: Prüft, ob für ein bestimmtes Event Handler zugewiesen sind

@signature: checkEvent: (name: string) =\> boolean

### Parameters

- `name` - (required) *string* - der Name des Events

### Returns
- ` isExist` - (boolean) - gibt <i>true</i> zurück, wenn mindestens ein Handler für das Event gesetzt ist

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
       
gantt.checkEvent("onTaskClick"); //gibt 'true' zurück
~~~

### Related API
- [attachEvent](api/method/attachevent.md)

### Related Guides
- ["Event-Behandlung"](guides/handling-events.md)


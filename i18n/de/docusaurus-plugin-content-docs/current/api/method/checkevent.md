---
sidebar_label: checkEvent
title: checkEvent method
description: "Prüft, ob einem Event ein oder mehrere Handler zugeordnet sind"
---

# checkEvent

### Description

@short: Prüft, ob einem Event ein oder mehrere Handler zugeordnet sind

@signature: checkEvent: (name: string) =\> boolean

### Parameters

- `name` - (required) *string* - Name des Events

### Returns
- ` isExist` - (boolean) - gibt <i>true</i> zurück, wenn dem Event ein oder mehrere Handler zugeordnet sind

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
       
gantt.checkEvent("onTaskClick"); //returns 'true'
~~~

### Related API
- [attachEvent](api/method/attachevent.md)

### Related Guides
- [Event Handling](guides/handling-events.md)
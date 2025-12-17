---
sidebar_label: checkEvent
title: checkEvent method
description: "checks whether an event has some handler(s) specified"
---

# checkEvent

### Description

@short: Checks whether an event has some handler(s) specified

@signature: checkEvent: (name: string) =\> boolean

### Parameters

- `name` - (required) *string* - the event's name

### Returns
- ` isExist` - (boolean) - returns <i>true</i>, if some handler is specified for the event

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


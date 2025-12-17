---
sidebar_label: detachEvent
title: detachEvent method
description: "移除先前通过 attachEvent() 方法附加的事件处理程序"
---

# detachEvent

### Description

@short: 移除先前通过 attachEvent() 方法附加的事件处理程序

@signature: detachEvent: (id: string) =\> void

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
- [事件处理](guides/handling-events.md)


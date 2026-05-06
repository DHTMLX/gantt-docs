---
sidebar_label: detachEvent
title: detachEvent 方法
description: "从事件中分离一个处理程序（该事件之前通过 attachEvent() 方法附加）"
---

# detachEvent

### Description

@short: 从事件中分离一个处理程序（该事件之前通过 attachEvent() 方法附加）

@signature: detachEvent: (id: string) =\> void

### Parameters
- `id` - (必填) *string* -  事件的 id

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
---
sidebar_label: detachEvent
title: detachEvent method
description: "이전에 attachEvent() 메서드를 통해 추가된 이벤트 핸들러를 제거합니다."
---

# detachEvent

### Description

@short: 이전에 attachEvent() 메서드를 통해 추가된 이벤트 핸들러를 제거합니다.

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
- [이벤트 처리](guides/handling-events.md)


---
sidebar_label: detachEvent
title: detachEvent 메서드
description: "이벤트에서 핸들러를 분리합니다(이전에 attachEvent() 메서드로 연결된 경우)"
---

# detachEvent

### Description

@short: 이벤트에 바인딩된 핸들러를 분리합니다(이전에 attachEvent() 메서드로 연결된 경우

@signature: detachEvent: (id: string) =\> void

### Parameters
- `id` - (required) *string* -  이벤트의 식별자

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


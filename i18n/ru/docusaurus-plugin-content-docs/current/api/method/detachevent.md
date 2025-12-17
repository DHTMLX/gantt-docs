---
sidebar_label: detachEvent
title: detachEvent method
description: "удаляет ранее присоединённый обработчик события (добавленный с помощью метода attachEvent())"
---

# detachEvent

### Description

@short: Удаляет ранее присоединённый обработчик события (добавленный с помощью метода attachEvent())

@signature: detachEvent: (id: string) =\> void

### Parameters
- `id` - (required) *string* - идентификатор обработчика события

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
- [Обработка событий](guides/handling-events.md)


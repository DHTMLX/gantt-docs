---
sidebar_label: detachEvent
title: detachEvent method
description: "отсоединяет обработчик от события (которое ранее было привязано методом attachEvent())"
---

# detachEvent

### Description

@short: Отключает обработчик от события, которое ранее было привязано методом attachEvent()

@signature: detachEvent: (id: string) => void

### Parameters
- `id` - (обязательный) *string* -  идентификатор события

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
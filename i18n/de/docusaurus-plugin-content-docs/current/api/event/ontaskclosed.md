---
sidebar_label: onTaskClosed
title: onTaskClosed-Ereignis
description: "Wird ausgelöst, wenn ein Zweig geschlossen wurde"
---

# onTaskClosed

### Description

@short: Wird ausgelöst, wenn ein Zweig geschlossen wurde

@signature: onTaskClosed: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - die Zweig-ID

### Example

~~~jsx
gantt.attachEvent("onTaskClosed", function(id) {
    alert(`Du hast einen Branch mit der ID=${id} geschlossen`);
});
~~~

### Related API
- [close](api/method/close.md)
- [onTaskOpened](api/event/ontaskopened.md)
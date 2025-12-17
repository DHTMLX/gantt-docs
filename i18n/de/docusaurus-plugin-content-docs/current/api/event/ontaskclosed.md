---
sidebar_label: onTaskClosed
title: onTaskClosed event
description: "wird ausgelöst, wenn ein Branch geschlossen wird"
---

# onTaskClosed

### Description

@short: Wird ausgelöst, wenn ein Branch geschlossen wird

@signature: onTaskClosed: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string,number* - die ID des Branches

### Example

~~~jsx
gantt.attachEvent("onTaskClosed", function(id) {
    alert(`Du hast einen Branch mit der ID=${id} geschlossen`);
});
~~~

### Related API
- [close](api/method/close.md)
- [onTaskOpened](api/event/ontaskopened.md)


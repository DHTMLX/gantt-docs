---
sidebar_label: onTaskOpened
title: onTaskOpened event
description: "Wird ausgelöst, wenn ein Branch geöffnet wird"
---

# onTaskOpened

### Description

@short: Wird ausgelöst, wenn ein Branch geöffnet wird

@signature: onTaskOpened: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - Die Kennung des Branches

### Example

~~~jsx
gantt.attachEvent("onTaskOpened", function(id) {
    //Hier kann benutzerdefinierte Logik eingefügt werden
});
~~~

### Related API
- [open](api/method/open.md)
- [onTaskClosed](api/event/ontaskclosed.md)


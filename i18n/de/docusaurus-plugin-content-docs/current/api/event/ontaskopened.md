---
sidebar_label: onTaskOpened
title: onTaskOpened Ereignis
description: "wird ausgelöst, wenn ein Ast geöffnet wurde"
---

# onTaskOpened

### Description

@short: Wird ausgelöst, wenn ein Ast geöffnet wurde

@signature: onTaskOpened: (id: string | number) =\> void;

### Parameters

- `id` - (erforderlich) *string | number* - die Ast-ID

### Example

~~~jsx
gantt.attachEvent("onTaskOpened", function(id) {
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [open](api/method/open.md)
- [onTaskClosed](api/event/ontaskclosed.md)
---
sidebar_label: onTaskIdChange
title: onTaskIdChange event
description: "wird ausgelöst, wenn die ID einer Aufgabe geändert wird"
---

# onTaskIdChange

### Description

@short: Wird ausgelöst, wenn die ID einer Aufgabe geändert wird

@signature: onTaskIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (erforderlich) *string | number* - die ID der aktuellen Aufgabe
- `new_id` - (erforderlich) *string | number* - die neue Aufgabe-ID

### Example

~~~jsx
gantt.attachEvent("onTaskIdChange", function(id,new_id){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [changeTaskId](api/method/changetaskid.md)
---
sidebar_label: onAfterTaskDelete
title: onAfterTaskDelete Event
description: "Wird ausgelöst, nachdem der Benutzer eine Aufgabe gelöscht hat"
---

# onAfterTaskDelete

### Description

@short: Wird ausgelöst, nachdem der Benutzer eine Aufgabe gelöscht hat

@signature: onAfterTaskDelete: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - die Task-ID
- `task` - (required) *Task* - das Task-Objekt

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDelete", function(id,task){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [deleteTask](api/method/deletetask.md)
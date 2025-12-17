---
sidebar_label: onAfterTaskDelete
title: onAfterTaskDelete event
description: "Wird unmittelbar ausgelöst, nachdem ein Task vom Benutzer gelöscht wurde"
---

# onAfterTaskDelete

### Description

@short: Wird unmittelbar ausgelöst, nachdem ein Task vom Benutzer gelöscht wurde

@signature: onAfterTaskDelete: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID des Tasks
- `task` - (required) *Task* - das Task-Objekt

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDelete", function(id,task){
    //hier kann benutzerdefinierte Logik hinzugefügt werden
});
~~~

### Related API
- [deleteTask](api/method/deletetask.md)


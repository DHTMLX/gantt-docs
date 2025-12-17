---
sidebar_label: onAfterTaskUpdate
title: onAfterTaskUpdate event
description: "Wird unmittelbar ausgelöst, nachdem ein Benutzer eine Aufgabe aktualisiert hat"
---

# onAfterTaskUpdate

### Description

@short: Wird unmittelbar ausgelöst, nachdem ein Benutzer eine Aufgabe aktualisiert hat

@signature: onAfterTaskUpdate: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe
- `task` - (required) *Task* - das Task-Objekt

### Example

~~~jsx
gantt.attachEvent("onAfterTaskUpdate", function(id,task){
    //beliebige eigene Logik hier
});
~~~

### Related API
- [updateTask](api/method/updatetask.md)
- [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md)


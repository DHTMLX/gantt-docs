---
sidebar_label: onAfterTaskUpdate
title: onAfterTaskUpdate event
description: "Wird ausgelöst, nachdem der Benutzer eine Aufgabe aktualisiert hat"
---

# onAfterTaskUpdate

### Description

@short: Wird ausgelöst, nachdem der Benutzer eine Aufgabe aktualisiert hat

@signature: onAfterTaskUpdate: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (erforderlich) *string | number* - die Aufgaben-ID
- `task` - (erforderlich) *Task* - das Aufgabenobjekt

### Example

~~~jsx
gantt.attachEvent("onAfterTaskUpdate", function(id,task){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [updateTask](api/method/updatetask.md)
- [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md)
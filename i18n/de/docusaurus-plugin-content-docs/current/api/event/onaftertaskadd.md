---
sidebar_label: onAfterTaskAdd
title: onAfterTaskAdd-Ereignis
description: "wird ausgelöst, nachdem der Benutzer eine Aufgabe in das Gantt-Diagramm hinzugefügt hat"
---

# onAfterTaskAdd

### Description

@short: Wird ausgelöst, nachdem der Benutzer eine Aufgabe in das Gantt-Diagramm hinzugefügt hat

@signature: onAfterTaskAdd: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (erforderlich) *string | number* - die Task-ID
- `task` - (erforderlich) *Task* - das Task-Objekt

### Beispiel

~~~jsx
gantt.attachEvent("onAfterTaskAdd", function(id,task){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [addTask](api/method/addtask.md)
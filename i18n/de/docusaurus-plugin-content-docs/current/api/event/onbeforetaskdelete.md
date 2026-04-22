---
sidebar_label: onBeforeTaskDelete
title: onBeforeTaskDelete Event
description: "wird ausgelöst, bevor der Benutzer eine Aufgabe löscht"
---

# onBeforeTaskDelete

### Description

@short: Wird ausgelöst, bevor der Benutzer eine Aufgabe löscht

@signature: onBeforeTaskDelete: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die Task-ID
- `task` - (required) *Task* - das Task-Objekt

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDelete", function(id,task){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

Das Event kann blockiert werden. Gib false zurück, um das Löschen der Aufgabe abzubrechen.

### Related API
- [deleteTask](api/method/deletetask.md)
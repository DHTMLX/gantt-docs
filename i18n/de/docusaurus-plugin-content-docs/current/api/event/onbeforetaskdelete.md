---
sidebar_label: onBeforeTaskDelete
title: onBeforeTaskDelete event
description: "Wird ausgelöst, kurz bevor eine Aufgabe vom Benutzer gelöscht wird."
---

# onBeforeTaskDelete

### Description

@short: Wird ausgelöst, kurz bevor eine Aufgabe vom Benutzer gelöscht wird.

@signature: onBeforeTaskDelete: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe
- `task` - (required) *Task* - das Aufgabenobjekt

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDelete", function(id,task){
    // benutzerdefinierte Logik kann hier hinzugefügt werden
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Ein Rückgabewert von false verhindert, dass die Aufgabe gelöscht wird.

### Related API
- [deleteTask](api/method/deletetask.md)


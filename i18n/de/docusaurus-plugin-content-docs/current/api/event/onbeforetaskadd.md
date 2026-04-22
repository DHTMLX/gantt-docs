---
sidebar_label: onBeforeTaskAdd
title: onBeforeTaskAdd Event
description: "wird ausgelöst, bevor eine neue Aufgabe dem Gantt-Diagramm hinzugefügt wird"
---

# onBeforeTaskAdd

### Description

@short: Wird ausgelöst, bevor eine neue Aufgabe dem Gantt-Diagramm hinzugefügt wird

@signature: onBeforeTaskAdd: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die Aufgaben-ID
- `task` - (required) *Task* - das Task-Objekt

### Returns
- `result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

Das Event ist blockierbar. Geben Sie `false` zurück, um das Hinzufügen der Aufgabe abzubrechen.

### Related API
- [addTask](api/method/addtask.md)
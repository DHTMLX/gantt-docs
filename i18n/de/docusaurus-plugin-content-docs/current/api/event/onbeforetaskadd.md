---
sidebar_label: onBeforeTaskAdd
title: onBeforeTaskAdd event
description: "Wird ausgelöst, kurz bevor eine neue Aufgabe zum Gantt-Diagramm hinzugefügt wird"
---

# onBeforeTaskAdd

### Description

@short: Wird ausgelöst, kurz bevor eine neue Aufgabe zum Gantt-Diagramm hinzugefügt wird

@signature: onBeforeTaskAdd: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die Aufgaben-ID
- `task` - (required) *Task* - das Aufgabenobjekt

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt werden soll (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    //beliebige eigene Logik hier
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Die Rückgabe von *false* verhindert, dass die Aufgabe hinzugefügt wird.

### Related API
- [addTask](api/method/addtask.md)


---
sidebar_label: onAfterTaskAdd
title: onAfterTaskAdd event
description: "Wird direkt ausgelöst, nachdem eine Aufgabe zum Gantt-Diagramm hinzugefügt wurde"
---

# onAfterTaskAdd

### Description

@short: Wird direkt ausgelöst, nachdem eine Aufgabe zum Gantt-Diagramm hinzugefügt wurde

@signature: onAfterTaskAdd: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe
- `task` - (required) *Task* - das Aufgabenobjekt

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAdd", function(id,task){
    //beliebige eigene Logik hier
});
~~~

### Related API
- [addTask](api/method/addtask.md)


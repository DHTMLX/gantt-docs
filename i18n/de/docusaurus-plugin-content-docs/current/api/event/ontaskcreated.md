---
sidebar_label: onTaskCreated
title: onTaskCreated-Ereignis
description: "löst aus, wenn ein Benutzer eine neue Aufgabe erstellt, indem er die '+'-Schaltfläche in einem Grid drückt, oder wenn die createTask-Methode aufgerufen wird"
---

# onTaskCreated

### Description

@short: Löst aus, wenn ein Benutzer eine neue Aufgabe erstellt, indem er die '+'-Schaltfläche in einem Grid drückt oder wenn die [createTask](api/method/createtask.md) Methode aufgerufen wird

@signature: onTaskCreated: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - das Objekt einer neuen Aufgabe

### Returns
- ` result` - (boolean) - Die Rückgabe von `false` wird die Erstellung einer neuen Aufgabe abbrechen, die Rückgabe von `true` setzt die Standardverarbeitung fort

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
    task.projectId = 1;
    return true;
});
~~~

### Details

Das Event wird ausgelöst, bevor eine neue Aufgabe angezeigt wird, was es Ihnen ermöglicht, **Standardwerte festzulegen** oder die Erstellung einer Aufgabe zu verhindern.

Zum Zeitpunkt der Auslösung dieses Events ist die neue Aufgabe bereits im Datenspeicher über die [getTask](api/method/gettask.md) Methode verfügbar.

Wenn der Event-Handler `false` zurückgibt, wird die Aufgabe aus dem Datenspeicher entfernt, ohne das [onAfterTaskDelete](api/event/onaftertaskdelete.md) Event auszulösen.

Die finale Abfolge der Ereignisse, die ausgelöst wird, wenn Sie eine Aufgabe mit der [createTask](api/method/createtask.md) Methode erstellen, ist:

1. [onTaskCreated](api/event/ontaskcreated.md)
2. [onBeforeLightbox](api/event/onbeforelightbox.md)
3. [onLightbox](api/event/onlightbox.md)
4. [onAfterLightbox](api/event/onafterlightbox.md)
5. [onAfterTaskAdd](api/event/onaftertaskadd.md)
6. [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related API
- [createTask](api/method/createtask.md)
- [columns](api/config/columns.md)
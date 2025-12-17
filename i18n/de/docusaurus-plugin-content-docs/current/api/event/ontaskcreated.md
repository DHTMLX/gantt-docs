---
sidebar_label: onTaskCreated
title: onTaskCreated event
description: "Wird ausgelöst, wenn ein Benutzer eine neue Aufgabe durch Klicken auf die '+'-Schaltfläche in einem Grid hinzufügt oder wenn die Methode createTask aufgerufen wird."
---

# onTaskCreated

### Description

@short: Wird ausgelöst, wenn ein Benutzer eine neue Aufgabe durch Klicken auf die '+'-Schaltfläche in einem Grid hinzufügt oder wenn die Methode [createTask](api/method/createtask.md) aufgerufen wird.

@signature: onTaskCreated: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - Das neue Task-Objekt

### Returns
- ` result` - (boolean) - Die Rückgabe von `false` verhindert die Erstellung der neuen Aufgabe, die Rückgabe von `true` lässt den Standardprozess fortfahren.

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
    task.projectId = 1;
    return true;
});
~~~

### Details

Dieses Event tritt genau bevor eine neue Aufgabe angezeigt wird auf und gibt Ihnen die Möglichkeit, **Standardwerte festzulegen** oder **die Erstellung der Aufgabe abzubrechen**.

Zu diesem Zeitpunkt existiert die neue Aufgabe bereits im Datenspeicher und kann über die Methode [getTask](api/method/gettask.md) abgerufen werden.

Wenn der Event-Handler `false` zurückgibt, wird die Aufgabe aus dem Datenspeicher entfernt, ohne dass das Event [onAfterTaskDelete](api/event/onaftertaskdelete.md) ausgelöst wird.

Beim Erstellen einer Aufgabe über die Methode [createTask](api/method/createtask.md) erfolgen die Events in folgender Reihenfolge:

1. [onTaskCreated](api/event/ontaskcreated.md) 
2. [onBeforeLightbox](api/event/onbeforelightbox.md) 
3. [onLightbox](api/event/onlightbox.md) 
4. [onAfterLightbox](api/event/onafterlightbox.md) 
5. [onAfterTaskAdd](api/event/onaftertaskadd.md) 
6. [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related API
- [createTask](api/method/createtask.md)
- [columns](api/config/columns.md)


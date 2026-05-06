---
sidebar_label: createTask
title: createTask Methode
description: "fügt eine neue Aufgabe hinzu und öffnet die Lightbox zur Bestätigung"
---

# createTask

### Description

@short: Fügt eine neue Aufgabe hinzu und öffnet die Lightbox zur Bestätigung

@signature: createTask: (task?: NewTask, parent?: string | number, index?: number) =\> string | number

### Parameters

- `task`    -	 (optional) *NewTask*	- optional, das Task-Objekt
- `parent`	-	(optional) *string | number*	- optional, die ID des Elternteils
- `index`	-	(optional) *number*	-  optional, die Position, an der die Aufgabe hinzugefügt wird (0 oder größer)

### Returns
- ` id` - (string, number) - die Aufgaben-ID

### Example

~~~jsx
var taskId = gantt.createTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2", 2);
~~~

### Details

Wenn Sie den *index*-Parameter mit einem Wert von 0 oder größer setzen, wird eine Aufgabe an der angegebenen Position im Zweig hinzugefügt.
Andernfalls wird die Aufgabe am Ende des Aufgaben-Zweigs hinzugefügt.

Die Methode löst das [onTaskCreated](api/event/ontaskcreated.md) Ereignis aus. Beachten Sie, dass das Ereignis ausgelöst wird, bevor die neue Aufgabe dem Datensatz hinzugefügt wird, was Ihnen ermöglicht, das Speichern dieser Aufgabe ganz zu widerrufen, z. B. wenn der Benutzer im Lightbox-Fenster auf 'Abbrechen' klickt.

Die endgültige Reihenfolge der Ereignisse, die ausgelöst werden, wenn Sie eine Aufgabe mit der createTask() Methode erstellen:

1. [onTaskCreated](api/event/ontaskcreated.md)
2. [onBeforeLightbox](api/event/onbeforelightbox.md)
3. [onLightbox](api/event/onlightbox.md)
4. [onAfterLightbox](api/event/onafterlightbox.md)
5. [onAfterTaskAdd](api/event/onaftertaskadd.md)
6. [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related API
- [onTaskCreated](api/event/ontaskcreated.md)
- [addTask](api/method/addtask.md)

### Related Guides
- [Grundoperationen mit Aufgaben](guides/crud-task.md)
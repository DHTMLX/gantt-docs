---
sidebar_label: createTask
title: createTask method
description: "Fügt eine neue Aufgabe hinzu und öffnet die Lightbox zur Bestätigung"
---

# createTask

### Description

@short: Fügt eine neue Aufgabe hinzu und öffnet die Lightbox zur Bestätigung

@signature: createTask: (task?: NewTask, parent?: string | number, index?: number) =\> string | number

### Parameters
- `task` - (optional) *NewTask* - das Aufgabenobjekt
- `parent` - (optional) *string | number* - die ID des übergeordneten Elements
- `index` - (optional) *number* - die Position, an der die Aufgabe eingefügt wird (0 oder größer)

### Returns
- ` id` - (string, number) - die ID der Aufgabe

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

Wenn Sie den Parameter *index* mit einem Wert von 0 oder höher angeben, wird die Aufgabe an genau dieser Position innerhalb des Zweigs eingefügt. 
Ist der *index* nicht angegeben, wird die Aufgabe einfach am Ende des Zweigs hinzugefügt.

Diese Methode löst das Event [onTaskCreated](api/event/ontaskcreated.md) aus. Beachten Sie, dass dieses Event auftritt, bevor die neue Aufgabe tatsächlich zum Datensatz hinzugefügt wird, 
was bedeutet, dass Sie das Speichern der Aufgabe vollständig abbrechen können - beispielsweise wenn der Benutzer im Lightbox den 'Abbrechen'-Button drückt.


Hier ist die Reihenfolge der Ereignisse, die ablaufen, wenn Sie eine Aufgabe mit createTask() erstellen:

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
- ["Grundlegende Operationen mit Aufgaben"](guides/crud-task.md)


---
sidebar_label: onTaskDrag
title: onTaskDrag-Ereignis
description: "wird ausgelöst, wenn der Benutzer eine Aufgabe zieht"
---

# onTaskDrag

### Description

@short: Wird ausgelöst, wenn der Benutzer eine Aufgabe zieht

@signature: onTaskDrag: (id: string | number, mode: string, task: Task, original: Task, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - die Aufgaben-ID
- `mode` - (required) *string* - der Drag-Modus ("resize", "progress", "move", "ignore")
- `task` - (required) *Task* - das aktuelle (gezogene) Task-Objekt
- `original` - (required) *Task* - das ursprüngliche (anfängliche) Task-Objekt
- `e` - (required) *Event* - ein natives Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related samples
- [Drag parent task with its children](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)
- [Limit drag and drop dates](https://docs.dhtmlx.com/gantt/samples/08_api/02_constraints.html)

### Details

The event:

- Wird jedes Mal ausgelöst, wenn der Benutzer eine Drag-Bewegung mit der Maus im Timeline-Bereich ausführt: Die Aufgabe wird verschoben, die Größe angepasst oder der Fortschritt der Aufgabe angepasst.
- Der Typ einer Drag-Bewegung wird als zweites Argument übergeben - **mode**.
- Alle verfügbaren Werte des Typs der Drag-Bewegung sind in der [drag_mode](api/config/drag_mode.md) Eigenschaft gespeichert.

Kurz gesagt passiert Folgendes in der folgenden Reihenfolge:

1. Der Benutzer führt eine Verschiebung aus.
2. dhtmlxGantt berechnet das Datum der Aufgabe entsprechend der neuen Position neu.
3. dhtmlxGantt löst das [onTaskDrag](api/event/ontaskdrag.md) Event aus.
4. dhtmlxGantt rendert die Aufgabe im Gantt-Diagramm neu.

### Related API
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [drag_mode](api/config/drag_mode.md)

### Related Guides
- [Dragging Tasks within the Timeline](guides/dnd.md#denying-dragging-tasks-out-of-specific-dates)
- [How-tos](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline)
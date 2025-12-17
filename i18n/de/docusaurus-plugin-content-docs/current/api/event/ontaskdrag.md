---
sidebar_label: onTaskDrag
title: onTaskDrag event
description: "Wird ausgelöst, wenn ein Task vom Benutzer gezogen wird"
---

# onTaskDrag

### Description

@short: Wird ausgelöst, wenn ein Task vom Benutzer gezogen wird

@signature: onTaskDrag: (id: string | number, mode: string, task: Task, original: Task, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - die Task-ID
- `mode` - (required) *string* - der Drag-Modus ("resize", "progress", "move", "ignore")
- `task` - (required) *Task* - das aktuelle (gezogene) Task-Objekt
- `original` - (required) *Task* - das ursprüngliche (initiale) Task-Objekt
- `e` - (required) *Event* - ein nativer Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    // beliebige benutzerdefinierte Logik hier
});
~~~

### Related samples
- [Drag parent task with its children](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)
- [Limit drag and drop dates](https://docs.dhtmlx.com/gantt/samples/08_api/02_constraints.html)

### Details

Dieses Event tritt jedes Mal auf, wenn der Benutzer die Maus im Timeline-Bereich zieht, um einen Task zu verschieben, zu skalieren oder den Fortschritt des Tasks zu aktualisieren. Der Drag-Typ wird durch das zweite Argument - **mode** - angegeben. Alle möglichen Werte für den Drag-Modus finden Sie in der Datei [drag_mode](api/config/drag_mode.md).

Zusammengefasst läuft der Prozess wie folgt ab:

1. Der Benutzer startet eine Drag-Aktion.
2. dhtmlxGantt berechnet die Task-Daten basierend auf der neuen Position neu.
3. dhtmlxGantt löst das Event [onTaskDrag](api/event/ontaskdrag.md) aus.
4. dhtmlxGantt aktualisiert die Darstellung des Tasks im Gantt-Chart.

### Related API
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [drag_mode](api/config/drag_mode.md)

### Related Guides
- ["Verschieben von Aufgaben innerhalb der Zeitleiste"](guides/dnd.md#preventingdraggingtasksoutsidecertaindates)
- ["How-tos"](guides/how-to.md#howtohaveaninfinitescrollinthetimeline)


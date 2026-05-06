---
sidebar_label: onBeforeTaskDrag
title: onBeforeTaskDrag Event
description: "wird ausgelöst, nachdem der Benutzer die Maustaste gedrückt und mit dem Ziehen begonnen hat, aber bevor dhtmlxGantt den Drag-and-Drop-Vorgang startet"
---

# onBeforeTaskDrag

### Description

@short: Wird ausgelöst, nachdem der Benutzer die Maustaste gedrückt hat und mit dem Ziehen begonnen hat, bevor dhtmlxGantt den Drag-and-Drop-Vorgang startet

@signature: onBeforeTaskDrag: (id: string | number, mode: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die Aufgaben-ID
- `mode` - (required) *string* - der Drag-and-Drop-Modus ("resize", "progress", "move", "ignore")
- `e` - (required) *Event* - ein natives Event-Objekt

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

Das Event wird ausgelöst, wenn der Benutzer eine Aufgabe im Timeline-Bereich zieht.

Das Event ist blockierbar. Gibst du <em>false</em> zurück, wird die Aufgabe auf die ursprüngliche Position zurückgesetzt.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)

### Related Guides
- [Dragging Tasks within the Timeline](guides/dnd.md)
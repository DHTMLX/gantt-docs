---
sidebar_label: onAfterTaskDrag
title: onAfterTaskDrag event
description: "Wird ausgelöst, sobald der Benutzer das Dragging beendet und die Maustaste loslässt."
---

# onAfterTaskDrag

### Description

@short: Wird ausgelöst, sobald der Benutzer das Dragging beendet und die Maustaste loslässt.

@signature: onAfterTaskDrag: (id: string | number, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe
- `mode` - (required) *string* - der Drag-and-Drop-Modus ("resize", "progress", "move", "ignore")
- `e` - (required) *Event* - ein nativer Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Details

Dieses Event tritt auf, wenn eine Aufgabe innerhalb des Timeline-Bereichs gezogen wurde.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)


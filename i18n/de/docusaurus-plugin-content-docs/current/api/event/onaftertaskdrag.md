---
sidebar_label: onAfterTaskDrag
title: onAfterTaskDrag event
description: "löst aus, nachdem der Benutzer das Ziehen beendet und die Maustaste losgelassen hat"
---

# onAfterTaskDrag

### Description

@short: Auslöst, nachdem der Benutzer das Ziehen beendet und die Maustaste losgelassen hat

@signature: onAfterTaskDrag: (id: string | number, mode: string, e: Event) =\> void;

### Parameters

- `id` - (erforderlich) *string | number* - die Aufgaben-ID
- `mode` - (erforderlich) *string* - der Drag-and-Drop-Modus ("resize", "progress", "move", "ignore")
- `e` - (erforderlich) *Event* - ein natives Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Details

Das Event wird ausgelöst, wenn der Benutzer eine Aufgabe im Timeline-Bereich zieht.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)
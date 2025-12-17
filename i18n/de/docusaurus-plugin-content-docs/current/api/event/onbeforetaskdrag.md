---
sidebar_label: onBeforeTaskDrag
title: onBeforeTaskDrag event
description: "Wird direkt ausgelöst, nachdem der Benutzer die Maustaste gedrückt hält und mit dem Draggen beginnt, jedoch bevor dhtmlxGantt den Drag-and-Drop-Prozess startet."
---

# onBeforeTaskDrag

### Description

@short: Wird direkt ausgelöst, nachdem der Benutzer die Maustaste gedrückt hält und mit dem Draggen beginnt, jedoch bevor dhtmlxGantt den Drag-and-Drop-Prozess startet.

@signature: onBeforeTaskDrag: (id: string | number, mode: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die Task-ID
- `mode` - (required) *string* - der Drag-and-Drop-Modus ("resize", "progress", "move", "ignore")
- `e` - (required) *Event* - ein natives Event-Objekt

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder verhindert wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    //beliebige eigene Logik hier
    return true;
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

Dieses Event tritt auf, wenn eine Aufgabe innerhalb der Timeline gezogen wird.

Es kann durch Rückgabe von *false* blockiert werden, wodurch die Aufgabe auf ihre ursprüngliche Position zurückgesetzt wird.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)

### Related Guides
- ["Verschieben von Aufgaben innerhalb der Zeitleiste"](guides/dnd.md)


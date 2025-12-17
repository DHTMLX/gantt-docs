---
sidebar_label: attachEvent
title: attachEvent method
description: "verbindet einen Handler mit einem internen Event von dhtmlxGantt"
---

# attachEvent

### Description

@short: Verbindet einen Handler mit einem internen Event von dhtmlxGantt

@signature: attachEvent: \<T extends keyof GanttEventCallback\>(event: T, handler: GanttEventCallback[T], settings?: HandlerSettings) =\> string

### Parameters

- `name` - (required) *string* - der Name des Events, case-insensitive
- `handler` - (required) *function* - die Handler-Funktion
- `settings` - (optionale) *HandlerSettings* - Einstellungen als Objekt für den Event-Handler

### Returns
- `event_id` - (string) - die ID des angehängten Event-Handlers

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("Sie haben gerade ein Element mit der id="+id+" angeklickt.");
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

Mehrere Handler können an dasselbe Event angehängt werden, und alle werden ausgeführt.
Wenn ein Handler *false* zurückgibt, wird die entsprechende Operation abgebrochen.
Die Handler werden in der Reihenfolge ausgeführt, in der sie angehängt wurden.

Eigenschaften des settings-Objekts
-----------------------
Das settings-Objekt kann folgende Eigenschaften enthalten:

- **id?** - (*string | number*) - der Bezeichner des Event-Handlers.
Dies ermöglicht das einfache Entfernen eines bestimmten Handlers von einem Event:

~~~js
gantt.attachEvent("onTaskClick", function(){
    console.log("task click");
}, {id: "my-click"}); /*!*/
... //später:
gantt.detachEvent("my-click");
~~~

- **once?** - (*boolean*) - gibt an, ob das Event nur einmal ausgelöst werden soll.
Setzen Sie dies auf *true*, um nur das erste Auftreten des Events zu erfassen, so:

~~~js
gantt.attachEvent("onTaskClick", function(){
    console.log("capture next task click");
    return true;
}, {once: true}); /*!*/
~~~

- **thisObject?** - (*any*) - definiert den `this`-Kontext für den Event-Listener.

~~~js
gantt.attachEvent("onTaskClick", function(){
    // ...
    return true;
}, {thisObject: this}); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)

### Related Guides
- ["Event-Behandlung"](guides/handling-events.md)


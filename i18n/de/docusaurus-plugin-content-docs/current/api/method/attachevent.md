---
sidebar_label: attachEvent
title: attachEvent method
description: "bindet den Handler an ein internes Event von dhtmlxGantt"
---

# attachEvent

### Description

@short: Bindet den Handler an ein internes Event von dhtmlxGantt

@signature: attachEvent: \<T extends keyof GanttEventCallback\>(event: T, handler: GanttEventCallback[T], settings?: HandlerSettings) =\> string

### Parameters

- `name` - (required) *string* - der Name des Events, Groß-/Kleinschreibung ignoriert
- `handler` - (required) *function* - die Handler-Funktion
- `settings` - (optional) *HandlerSettings* - optional, ein Objekt mit Einstellungen für den Event-Handler

### Returns
- `event_id` - (string) - die ID des angehängten Event-Handlers

### Example

~~~jsx
gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked an item with id=${id}`);
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

Sie können mehrere Handler für dasselbe Event anhängen und alle werden ausgeführt.
Wenn einige der Handler *false* zurückgeben, wird die zugehörige Operation blockiert.
Event-Handler werden in derselben Reihenfolge verarbeitet, in der sie angehängt wurden.

## Eigenschaften des Settings-Objekts

Das Settings-Objekt kann die folgenden Eigenschaften enthalten:

- `id?` - (*string | number*) - die ID des Event-Handlers.
Beispielsweise können Sie einen Handler einfach aus dem angegebenen Event trennen:

~~~js {3}
gantt.attachEvent("onTaskClick", () => {
    console.log("task click");
}, { id: "my-click" });

// after a while
gantt.detachEvent("my-click");
~~~

- `once?` - (*boolean*) - definiert, ob das Event nur einmal ausgeführt wird.
Stellen Sie die Eigenschaft auf *true*, wenn Sie den ersten Auslöser des Events erfassen möchten, wie in:

~~~js {4}
gantt.attachEvent("onTaskClick", () => {
    console.log("capture next task click");
    return true;
}, { once: true });
~~~

- `thisObject?` - (*any*) - gibt das `this`-Objekt für den Listener an.

~~~js {4}
gantt.attachEvent("onTaskClick", function() {
    // ...
    return true;
}, { thisObject: this });
~~~

### Related API
- [detachEvent](api/method/detachevent.md)

### Related Guides
- [Event Handling](guides/handling-events.md)
---
sidebar_label: eventRemove
title: eventRemove Methode
description: "entfernt einen Event-Handler von einem HTML-Element"
---

# eventRemove

### Description

@short: Entfernt einen Event-Handler von einem HTML-Element

@signature: eventRemove: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (required) *HTMLElement | string* -  das HTML-Element oder seine ID
- `event` - (required) *string* - der Name eines HTML-Events (ohne das 'on'-Präfix)
- `handler` - (required) *function* - der Event-Handler
- `options` - (optional) *boolean | HandlerSettings* - optional, der Wert entweder des useCapture- oder des Optionsparameters. Details lesen

### Example

~~~jsx
const handler = function(event){
    console.log("event!");
};
var element = document.querySelector(".my-element");

gantt.event(element, "click", handler);

gantt.eventRemove(element, "click", handler);
~~~

### Details

Alle Event-Listener, die über [event](api/method/event.md) verbunden wurden, werden automatisch entfernt, wenn der [destructor](api/method/destructor.md) aufgerufen wird.

### Related API
- [event](api/method/event.md)

### Related Guides
- [Event Handling](guides/handling-events.md)

### Change log
- in Version 4.0 hinzugefügt
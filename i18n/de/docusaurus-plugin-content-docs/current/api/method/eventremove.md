---
sidebar_label: eventRemove
title: eventRemove method
description: "entfernt einen Event-Handler von einem angegebenen HTML-Element"
---

# eventRemove

### Description

@short: Entfernt einen Event-Handler von einem angegebenen HTML-Element

@signature: eventRemove: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (required) *HTMLElement* - | string            das HTML-Element oder dessen ID
- `event` - (required) *string* - der Event-Name (ohne das Präfix 'on')
- `handler` - (required) *function* - die Funktion, die den Event behandelt
- `options` - (optional) *boolean | HandlerSettings* - optionale Angabe, entweder das useCapture-Flag oder ein options-Objekt. <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener">Details siehe</a>

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

Alle Event-Listener, die über [event](api/method/event.md) hinzugefügt wurden, werden automatisch entfernt, wenn [destructor](api/method/destructor.md) aufgerufen wird.

### Related API
- [event](api/method/event.md)

### Related Guides
- ["Event-Behandlung"](guides/handling-events.md)

### Change log
- hinzugefügt in Version 4.0


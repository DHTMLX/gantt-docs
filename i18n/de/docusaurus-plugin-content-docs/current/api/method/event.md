---
sidebar_label: event
title: event method
description: "bindet einen Event-Handler an ein HTML-Element"
---

# event

### Description

@short: Fügt einen Event-Handler an ein HTML-Element an

@signature: event: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (erforderlich) *HTMLElement | string* -  das HTML-Element oder seine ID
- `event` - (erforderlich) *string* -  der Name eines HTML-Ereignisses (ohne das 'on'-Präfix)
- `handler` - (erforderlich) *function* -  die Event-Handler-Funktion
- `options` - (optional) *boolean | HandlerSettings* - optional, der Wert entweder des useCapture- oder des Options-Parameters. Details lesen

### Example

~~~jsx
// fügt einen Handler für das 'onclick' Event hinzu
gantt.event("divId", "click", function(event){
    // e - DOM Event-Objekt
    do_something();
}, options);
~~~

### Details

Alle Event-Listener, die über [event](api/method/event.md) hinzugefügt werden, werden automatisch entfernt, wenn der [destructor](api/method/destructor.md) aufgerufen wird.

### Related API
- [eventRemove](api/method/eventremove.md)

### Related Guides
- [Event Handling](guides/handling-events.md)

### Change log
- hinzugefügt in Version 4.0
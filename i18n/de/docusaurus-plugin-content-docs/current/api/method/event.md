---
sidebar_label: event
title: event method
description: "richtet einen Event-Handler an einem HTML-Element ein"
---

# event

### Description

@short: Richtet einen Event-Handler an einem HTML-Element ein

@signature: event: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (required) *HTMLElement | string* -            das HTML-Element oder dessen ID
- `event` - (required) *string* - der Event-Name (ohne das Präfix 'on')
- `handler` - (required) *function* - die Funktion, die den Event behandelt
- `options` - (optional) *boolean | HandlerSettings* - der Wert für useCapture oder options. Mehr Infos


### Example

~~~jsx
// fügt einen Handler für das 'onclick' Event hinzu
gantt.event("divId", "click", function(event){
    // e - DOM Event-Objekt
    do_something();
}, options);
~~~

### Details

Alle Event Listener, die über [event](api/method/event.md) hinzugefügt wurden, werden automatisch entfernt, wenn [destructor](api/method/destructor.md) aufgerufen wird.

### Related API
- [eventRemove](api/method/eventremove.md)

### Related Guides
- ["Event-Behandlung"](guides/handling-events.md)

### Change log
- hinzugefügt in Version 4.0


---
sidebar_label: event
title: event method
description: "attaches an event handler to an HTML element"
---

# event

### Description

@short: Attaches an event handler to an HTML element

@signature: event: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (required) *HTMLElement | string* -  the HTML node or its id
- `event` - (required) *string* - the name of an HTML event (without the 'on' prefix)
- `handler` - (required) *function* - 	the event handler
- `options` - (optional) *boolean | HandlerSettings* - optional, the value of either the useCapture or options parameter. Read details

### Example

~~~jsx
// adds a handler for the 'onclick' event
gantt.event("divId", "click", function(event){
    // e - DOM event object
    do_something();
}, options);
~~~

### Details

All event listeners attached using [event](api/method/event.md) will be detached automatically when the [destructor](api/method/destructor.md) is called.

### Related API
- [eventRemove](api/method/eventremove.md)

### Related Guides
- [Event Handling](guides/handling-events.md)

### Change log
- added in version 4.0


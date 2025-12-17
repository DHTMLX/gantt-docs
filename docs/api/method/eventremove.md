---
sidebar_label: eventRemove
title: eventRemove method
description: "removes an event handler from an HTML element"
---

# eventRemove

### Description

@short: Removes an event handler from an HTML element

@signature: eventRemove: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (required) *HTMLElement | string* -  the HTML node or its id
- `event` - (required) *string* - the name of an HTML event (without the 'on' prefix)
- `handler` - (required) *function* - the event handler
- `options` - (optional) *boolean | HandlerSettings* - optional, the value of either the useCapture or options parameter. Read details

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

All event listeners attached using [event](api/method/event.md) will be detached automatically when the [destructor](api/method/destructor.md) is called.

### Related API
- [event](api/method/event.md)

### Related Guides
- [Event Handling](guides/handling-events.md)

### Change log
- added in version 4.0


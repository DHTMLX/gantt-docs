---
sidebar_label: attachEvent
title: attachEvent method
description: "attaches the handler to an inner event of dhtmlxGantt"
---

# attachEvent

### Description

@short: Attaches the handler to an inner event of dhtmlxGantt

@signature: attachEvent: \<T extends keyof GanttEventCallback\>(event: T, handler: GanttEventCallback[T], settings?: HandlerSettings) =\> string

### Parameters

- `name` - (required) *string* - the event's name, case-insensitive
- `handler` - (required) *function* - the handler function
- `settings` - (optional) *HandlerSettings* - optional, an object with settings for the event handler

### Returns
- `event_id` - (string) - the id of the attached event handler

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

You can attach several handlers to the same event and all of them will be executed.
If some of handlers will return *false* - the related operation will be blocked.
Event handlers are processed in the same order that they were attached.


Properties of settings object 
-----------------------
The settings object can contain the following properties:

- **id?** - (*string | number*) - the id of the event handler.
For example, you can easily detach a handler from the specified event:

~~~js
gantt.attachEvent("onTaskClick", function(){
    console.log("task click");
}, {id: "my-click"}); /*!*/
... //after a while:
gantt.detachEvent("my-click");
~~~

- **once?** - (*boolean*) - defines whether the event will be executed only once.
Set the property to *true* if you want to capture the first triggering of the event, as in:

~~~js
gantt.attachEvent("onTaskClick", function(){
    console.log("capture next task click");
    return true;
}, {once: true}); /*!*/
~~~

- **thisObject?** - (*any*) - specifies the `this` object for the listener.

~~~js
gantt.attachEvent("onTaskClick", function(){
    // ...
    return true;
}, {thisObject: this}); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)

### Related Guides
- [Event Handling](guides/handling-events.md)


---
sidebar_label: onBeforeTaskDrag
title: onBeforeTaskDrag event
description: "fires after the user has pressed the mouse button and started dragging, but before dhtmlxGantt starts the drag-and-drop operation"
---

# onBeforeTaskDrag

### Description

@short: Fires after the user has pressed the mouse button and started dragging, but before dhtmlxGantt starts the drag-and-drop operation

@signature: onBeforeTaskDrag: (id: string | number, mode: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the task id
- `mode` - (required) *string* - the drag-and-drop mode ("resize", "progress", "move", "ignore")
- `e` - (required) *Event* - a native event object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    //any custom logic here
    return true;
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

The event fires when the user drags a task in the timeline area.

The event is blockable. Return *false* and the task will be backed to the initial position.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)

### Related Guides
- [Dragging Tasks within the Timeline](guides/dnd.md)


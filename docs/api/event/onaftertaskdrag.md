---
sidebar_label: onAfterTaskDrag
title: onAfterTaskDrag event
description: "fires after the user has finished to drag and released the mouse button"
---

# onAfterTaskDrag

### Description

@short: Fires after the user has finished to drag and released the mouse button

@signature: onAfterTaskDrag: (id: string | number, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - the task ID
- `mode` - (required) *string* - the drag-and-drop mode ("resize", "progress", "move", "ignore")
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDrag", (id, mode, e) => {
    //any custom logic here
});
~~~

### Details

The event fires after the user drags a task in the timeline area.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)

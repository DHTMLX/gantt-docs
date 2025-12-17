---
sidebar_label: onBeforeTaskChanged
title: onBeforeTaskChanged event
description: "fires after the user has finished dragging and released the mouse button but before the changes are applied"
---

# onBeforeTaskChanged

### Description

@short: Fires after the user has finished dragging and released the mouse button but before the changes are applied

@signature: onBeforeTaskChanged: (id: string | number, mode: string, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the task id
- `mode` - (required) *string* - the drag-and-drop mode ("resize", "progress", "move", "ignore")
- `task` - (required) *Task* - the copy of the task object in its original state (before drag and drop)

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, task){
    //any custom logic here
    return true;
});
~~~

### Details

- The event fires when the user drags a task in the timeline area.
- The event is blockable. Return *false* to cancel the drag operation.
- The event fires before the [onAfterTaskDrag](api/event/onaftertaskdrag.md) event.

The **task** argument contains the original (not modified) task object, while the same data object available via the **gantt.getTask(id)** method is already modified.
This object can be used to check the exact changes made by drag and drop compared to the initial state of the task - e.g. whether duration increased or decreased, start date moved forward or backward, etc.
If *false* is returned from the method, the task object in gantt will rollback to the values from the original task object.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)


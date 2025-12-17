---
sidebar_label: onTaskDrag
title: onTaskDrag event
description: "fires when the user drags a task"
---

# onTaskDrag

### Description

@short: Fires when the user drags a task

@signature: onTaskDrag: (id: string | number, mode: string, task: Task, original: Task, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - the task id
- `mode` - (required) *string* - the drag mode ("resize", "progress", "move", "ignore")
- `task` - (required) *Task* - the current (dragged) task object
- `original` - (required) *Task* - the original(initial) task object
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    //any custom logic here
});
~~~

### Related samples
- [Drag parent task with its children](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)
- [Limit drag and drop dates](https://docs.dhtmlx.com/gantt/samples/08_api/02_constraints.html)

### Details

The event:

- Fires each time the user makes a drag movement with the mouse in the timeline area: moves, resizes a task or changes the task's progress.
- The type of a drag movement is passed as the 2nd argument - **mode**.
- All available values of the drag movement's type are stored in the [drag_mode](api/config/drag_mode.md) property.


Shortly, all happens in the following order:

1. The user makes a move.
2. dhtmlxGantt recalculates the task's date according to the new position.
3. dhtmlxGantt fires the [onTaskDrag](api/event/ontaskdrag.md) event.
4. dhtmlxGantt re-renders the task in the Gantt chart.

### Related API
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [drag_mode](api/config/drag_mode.md)

### Related Guides
- [Dragging Tasks within the Timeline](guides/dnd.md#denying-dragging-tasks-out-of-specific-dates)
- [How-tos](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline)


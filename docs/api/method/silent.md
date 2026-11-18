---
sidebar_label: silent
title: silent method
description: "makes all code inside it not to trigger internal events or server-side calls"
---

# silent

### Description

@short: Makes all code inside it not to trigger internal events or server-side calls

@signature: silent: (callback: GanttCallback) =\> void

### Parameters

- `callback` - (required) *function* - the callback function

### Example

~~~jsx
gantt.silent(function () {
    // the task will be deleted only from the client side
    // the gantt won't repaint it automatically
    gantt.deleteTask(id);
});

// repaint the gantt manually when ready
gantt.render();
~~~

### Details

A task moved inside `silent()`, for example with [moveTask()](api/method/movetask.md) or by changing its parent, doesn't fire the [onBeforeTaskMove](api/event/onbeforetaskmove.md) and [onAfterTaskMove](api/event/onaftertaskmove.md) events, isn't added to the undo history, and isn't sent to the server.

### Related Guides
- [Server-Side Integration](guides/server-side.md#error-handling)

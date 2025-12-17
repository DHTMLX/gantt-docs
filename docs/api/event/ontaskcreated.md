---
sidebar_label: onTaskCreated
title: onTaskCreated event
description: "fires when a user creates a new task by pressing the'+' button in a grid, or when the createTask method is called"
---

# onTaskCreated

### Description

@short: Fires when a user creates a new task by pressing the'+' button in a grid, or when the [createTask](api/method/createtask.md) method is called

@signature: onTaskCreated: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - the object of a new task

### Returns
- ` result` - (boolean) - returning `false` will cancel the creation of a new task, returning `true` will continue the default processing

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
    task.projectId = 1;
    return true;
});
~~~

### Details

The event fires before a new task is displayed, which allows you to **set default values** or **cancel the creation** of a task.

By the time this event is fired, the new task is already available in the datastore via the [getTask](api/method/gettask.md) method.

If the event handler returns `false`, the task will be removed from the datastore without firing the [onAfterTaskDelete](api/event/onaftertaskdelete.md) event.

The final order of events that fire when you create a task with the [createTask](api/method/createtask.md) method is:

1. [onTaskCreated](api/event/ontaskcreated.md)
2. [onBeforeLightbox](api/event/onbeforelightbox.md)
3. [onLightbox](api/event/onlightbox.md)
4. [onAfterLightbox](api/event/onafterlightbox.md)
5. [onAfterTaskAdd](api/event/onaftertaskadd.md)
6. [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related API
- [createTask](api/method/createtask.md)
- [columns](api/config/columns.md)


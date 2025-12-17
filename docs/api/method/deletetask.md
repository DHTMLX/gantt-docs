---
sidebar_label: deleteTask
title: deleteTask method
description: "deletes the specified task"
---

# deleteTask

### Description

@short: Deletes the specified task

@signature: deleteTask: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    the task's id

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2013",
    duration:28
});

gantt.deleteTask(10); /*!*/
~~~

### Details

The method invokes the [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) and [onAfterTaskDelete](api/event/onaftertaskdelete.md) events.

### Related API
- [addTask](api/method/addtask.md)
- [deleteLink](api/method/deletelink.md)

### Related Guides
- [Basic Operations with Tasks](guides/crud-task.md)


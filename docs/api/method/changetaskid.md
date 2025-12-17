---
sidebar_label: changeTaskId
title: changeTaskId method
description: "changes the task's id"
---

# changeTaskId

### Description

@short: Changes the task's id

@signature: changeTaskId: (id: string | number, new_id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    the current task's id
- `new_id` - (required) *string | number* -    the new task's id

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.changeTaskId(10, 15); //changes the task's id '10 -> 15' /*!*/
~~~

### Details

The method invokes the [onTaskIdChange](api/event/ontaskidchange.md) event.

### Related API
- [onTaskIdChange](api/event/ontaskidchange.md)
- [changeLinkId](api/method/changelinkid.md)


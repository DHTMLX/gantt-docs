---
sidebar_label: onAfterTaskDelete
title: onAfterTaskDelete event
description: "fires after the user deletes a task"
---

# onAfterTaskDelete

### Description

@short: Fires after the user deletes a task

@signature: onAfterTaskDelete: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - the task id
- `task` - (required) *Task* - the task object

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDelete", function(id,task){
    //any custom logic here
});
~~~

### Related API
- [deleteTask](api/method/deletetask.md)


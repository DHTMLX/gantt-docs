---
sidebar_label: onBeforeTaskDelete
title: onBeforeTaskDelete event
description: "fires before the user deletes a task"
---

# onBeforeTaskDelete

### Description

@short: Fires before the user deletes a task

@signature: onBeforeTaskDelete: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the task id
- `task` - (required) *Task* - the task object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDelete", function(id,task){
    //any custom logic here
    return true;
});
~~~

### Details

The event is blockable. Return false to cancel deleting of the task.

### Related API
- [deleteTask](api/method/deletetask.md)


---
sidebar_label: onAfterTaskUpdate
title: onAfterTaskUpdate event
description: "fires after the user updates a task"
---

# onAfterTaskUpdate

### Description

@short: Fires after the user updates a task

@signature: onAfterTaskUpdate: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - the task id
- `task` - (required) *Task* - the task object

### Example

~~~jsx
gantt.attachEvent("onAfterTaskUpdate", function(id,task){
    //any custom logic here
});
~~~

### Related API
- [updateTask](api/method/updatetask.md)
- [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md)


---
sidebar_label: onAfterTaskAdd
title: onAfterTaskAdd event
description: "fires after the user adds a task to the Gantt chart"
---

# onAfterTaskAdd

### Description

@short: Fires after the user adds a task to the Gantt chart

@signature: onAfterTaskAdd: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - the task id
- `task` - (required) *Task* - the task object

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAdd", function(id,task){
    //any custom logic here
});
~~~

### Related API
- [addTask](api/method/addtask.md)


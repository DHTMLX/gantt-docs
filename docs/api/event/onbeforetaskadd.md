---
sidebar_label: onBeforeTaskAdd
title: onBeforeTaskAdd event
description: "fires before a new task is added to the Gantt chart"
---

# onBeforeTaskAdd

### Description

@short: Fires before a new task is added to the Gantt chart

@signature: onBeforeTaskAdd: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the task id
- `task` - (required) *Task* - the task object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    //any custom logic here
    return true;
});
~~~

### Details

The event is blockable. Return *false* to cancel adding of the task.

### Related API
- [addTask](api/method/addtask.md)


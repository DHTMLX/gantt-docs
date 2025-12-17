---
sidebar_label: onTaskIdChange
title: onTaskIdChange event
description: "fires when the id of a task is changed"
---

# onTaskIdChange

### Description

@short: Fires when the id of a task is changed

@signature: onTaskIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - the current task's id
- `new_id` - (required) *string | number* - the new task's id

### Example

~~~jsx
gantt.attachEvent("onTaskIdChange", function(id,new_id){
    //any custom logic here
});
~~~

### Related API
- [changeTaskId](api/method/changetaskid.md)


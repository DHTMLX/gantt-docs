---
sidebar_label: onTaskDblClick
title: onTaskDblClick event
description: "fires when the user double clicks on a task"
---

# onTaskDblClick

### Description

@short: Fires when the user double clicks on a task

@signature: onTaskDblClick: (id: string, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - the id of the double clicked task

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskDblClick", function(id,e){
    //any custom logic here
    return true;
});
~~~

### Details

The event is blockable. Returning false will cancel the default handler (opening of task details)

### Related API
- [onTaskClick](api/event/ontaskclick.md)


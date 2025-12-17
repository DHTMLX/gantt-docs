---
sidebar_label: onTaskClick
title: onTaskClick event
description: "fires when the user clicks on a task row in the grid area (including the 'expand/collapse' and 'add task' buttons) or on a task bar in the timeline area"
---

# onTaskClick

### Description

@short: Fires when the user clicks on a task row in the grid area (including the 'expand/collapse' and 'add task' buttons) or on a task bar in the timeline area

@signature: onTaskClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the id of the clicked task
- `e` - (optional) *Event* - a native event object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id,e){
    //any custom logic here
    return true;
});
~~~

### Details

The event is blockable. Returning false will cancel the default handler (selecting a task)

### Related API
- [onTaskDblClick](api/event/ontaskdblclick.md)


---
sidebar_label: onBeforeTaskSelected
title: onBeforeTaskSelected event
description: "fires before the user selects a task"
---

# onBeforeTaskSelected

### Description

@short: Fires before the user selects a task

@signature: onBeforeTaskSelected: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the task id

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskSelected", function(id){
    //any custom logic here
    return true;
});
~~~

### Details

The event is blockable. Return *false* to cancel the default processing.

### Related API
- [onTaskSelected](api/event/ontaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)


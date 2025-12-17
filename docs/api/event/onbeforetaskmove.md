---
sidebar_label: onBeforeTaskMove
title: onBeforeTaskMove event
description: "fires before a task is moved to a new vertical position"
---

# onBeforeTaskMove

### Description

@short: Fires before a task is moved to a new vertical position

@signature: onBeforeTaskMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the id of the task to move
- `parent` - (required) *string | number* - the parent id
- `tindex` - (required) *number* - the index of the position in the parent branch that the task will be moved to

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
//prevent moving to another sub-branch:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    const task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

### Details

The event is blockable. Return *false* to cancel moving of the task.

Note, the event fires in 2 cases:

1. While calling the method [moveTask](api/method/movetask.md) 
2. While the option [order_branch](api/config/order_branch.md) is enabled in the default mode (*gantt.config.order_branch = true;*) and a user drags tasks

### Related API
- [moveTask](api/method/movetask.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)


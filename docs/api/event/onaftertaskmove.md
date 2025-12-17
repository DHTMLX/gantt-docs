---
sidebar_label: onAfterTaskMove
title: onAfterTaskMove event
description: "fires after a task was moved to a new vertical position"
---

# onAfterTaskMove

### Description

@short: Fires after a task was moved to a new vertical position

@signature: onAfterTaskMove: (id: string | number, parent: string | number, tindex: number) =\> void;

### Parameters

- `id` - (required) *string | number* - the id of the task to move
- `parent` - (required) *string | number* - the parent id
- `tindex` - (required) *number* - the index of the position in the parent branch that the task will be moved to

### Example

~~~jsx
// prevent moving to another sub-branch
gantt.attachEvent("onAfterTaskMove", function(id, parent, tindex){
    // any custom logic here
});
~~~

### Details

Note, the event fires in 2 cases:

1. While calling the method [moveTask](api/method/movetask.md) 
2. While the option [order_branch](api/config/order_branch.md) is enabled in the default mode (*gantt.config.order_branch = true;*) and a user drags tasks

### Related API
- [moveTask](api/method/movetask.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)


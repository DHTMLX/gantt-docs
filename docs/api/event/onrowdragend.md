---
sidebar_label: onRowDragEnd
title: onRowDragEnd event
description: "fires after the user drops a vertically reordered row in the grid"
---

# onRowDragEnd

### Description

@short: Fires after the user drops a vertically reordered row in the grid

@signature: onRowDragEnd: (id: string | number, target: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - the id of the task that the user has dragged vertically in the grid
- `target` - (required) *string | number* - the id of the task which place the dragged row has occupied

### Example

~~~jsx
gantt.attachEvent("onRowDragEnd", function(id, target) {
    //any custom logic here
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
The event is fired when a task is moved by the mouse pointer in the left-hand grid, while the [order_branch](api/config/order_branch.md) setting is enabled. If branch reordering is disabled, the event will never be called.
:::

The **target** parameter will contain the id of the nearest task that goes right before or right after the current task.

Its value may come in one of two formats:

- *target=targetId* - the current task should go right **before** the targetId task
- *target=next:targetId* - the current task should go right **after** the targetId task (occurs if you replace the last task in the chart)

An example of getting the id of a target in the *next:targetId* format:

~~~js
gantt.attachEvent("onRowDragEnd", function(id, target) {
      if(typeof(target) === "string"){
        targetTaskId  = target.substr("next:".length);
        nextTask = true;
      } else {
        targetTaskId  = target;
        nextTask = false;
      }
});
~~~

### Related API
- [onBeforeRowDragEnd](api/event/onbeforerowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Reordering Tasks](guides/reordering-tasks.md)


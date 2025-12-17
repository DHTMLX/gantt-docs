---
sidebar_label: onBeforeRowDragMove
title: onBeforeRowDragMove event
description: "fires before a row of the grid is dragged vertically to a different position"
---

# onBeforeRowDragMove

### Description

@short: Fires before a row of the grid is dragged vertically to a different position

@signature: onBeforeRowDragMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the id of the task to move in the grid
- `parent` - (required) *string | number* - the parent id
- `tindex` - (required) *number* - the index of the position in the parent branch that the task will be moved to

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowDragMove", function(id, parent, tindex){
     // return true/false;
});
~~~

### Details

The event is blockable. Return *false* to cancel moving of a row.

:::note
The event fires only if the option [order_branch](api/config/order_branch.md) is set to the "marker" value. 
:::

### Related API
- [order_branch](api/config/order_branch.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)


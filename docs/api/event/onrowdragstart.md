---
sidebar_label: onRowDragStart
title: onRowDragStart event
description: "fires before the user drags a row of the grid to vertically reorder it"
---

# onRowDragStart

### Description

@short: Fires before the user drags a row of the grid to vertically reorder it

@signature: onRowDragStart: (id: string | number, target: HTMLElement, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the id of the task that the user drags in the grid
- `target` - (required) *HTMLElement* - an HTML element of the task that the user drags
- `e` - (required) *Event* - a native event object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    //any custom logic here
    return true;
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
The event is fired when a task is moved by the mouse pointer in the left-hand grid, while the [order_branch](api/config/order_branch.md) setting is enabled. If branch reordering is disabled, the event will never be called.
:::


The event is blockable. Return *false* to cancel dragging.

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Reordering Tasks](guides/reordering-tasks.md)


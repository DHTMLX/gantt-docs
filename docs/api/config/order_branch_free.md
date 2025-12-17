---
sidebar_label: order_branch_free
title: order_branch_free config
description: "activates the 'branch' mode that allows reordering tasks within the whole gantt"
---

# order_branch_free

### Description

@short: Activates the 'branch' mode that allows reordering tasks within the whole gantt

@signature: order_branch_free: boolean

### Example

~~~jsx
// reordering tasks within the same nesting level
gantt.config.order_branch = true;
// reordering tasks within the whole gantt
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Drag and drop rows in Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)

### Related API
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Reordering Tasks](guides/reordering-tasks.md)


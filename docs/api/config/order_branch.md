---
sidebar_label: order_branch
title: order_branch config
description: "activates the 'branch' mode that allows vertically reordering tasks within the same tree level"
---

# order_branch

### Description

@short: Activates the 'branch' mode that allows vertically reordering tasks within the same tree level

@signature: order_branch: string | boolean

### Example

~~~jsx
gantt.config.order_branch = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

This option allows reordering tasks, while saving their tree level position. For example, a subtask will never become the parent task.

## Increasing performance

If your Gantt contains lots of tasks, the default mode of branch reordering may slow down the performance.
To speed it up, you can make use of the **"marker"** mode. 

~~~js
gantt.config.order_branch = "marker";
~~~

:::note
sample [Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html) 
:::

In this mode only the name of the task is reordered (on holding the left mouse key) and Gantt is re-rendered only when a task is dropped in the target position (on releasing the key).
Unlike the default mode, changing of the task position doesn't involve firing of the onBeforeTaskMove/onAfterTaskMove events.

To prevent dropping of a task in a particular position, use the [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) event instead (works only in the "marker" mode).

### Related API
- [order_branch_free](api/config/order_branch_free.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onBeforeRowDragMove](api/event/onbeforerowdragmove.md)

### Related Guides
- [Reordering Tasks](guides/reordering-tasks.md)


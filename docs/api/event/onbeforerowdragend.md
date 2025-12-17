---
sidebar_label: onBeforeRowDragEnd
title: onBeforeRowDragEnd event
description: "fires when a user drops a row in the grid"
---

# onBeforeRowDragEnd

### Description

@short: Fires when a user drops a row in the grid

@signature: onBeforeRowDragEnd: (sid: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `sid` - (required) *string | number* - the id of the task to move
- `parent` - (required) *string | number* - the parent id. Check the details below
- `tindex` - (required) *number* - the index of the position that the task will be moved from <br/> (the index in the whole tree). If specified, the <b>tindex</b> will refer to the index in the 'parent' branch. Check the details below

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){
    const task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
The event is fired when a task is moved by the mouse pointer in the left-hand grid, while the [order_branch](api/config/order_branch.md) setting is enabled. If branch reordering is disabled, the event will never be called.
:::

- When the event is fired the task is already moved to a new position, but the changes still can be reverted
- The event is blockable. Return *false* operation and move task to it's original location
- Original position (parent and index) are available from handler arguments
- Target position can be retrieved from a task object as [task.parent](guides/task-tree-operations.md#parent-of-a-task) and [gantt.getGlobalTaskIndex(taskId)](api/method/getglobaltaskindex.md)
- The **parent** and **tindex** parameters depend on the set [order_branch](api/config/order_branch.md) mode: 
    - In the regular mode ("true"):
        - the **parent** parameter refers to the *original* task's parent (the parent of a task before it was moved to a new position)
        - the **tindex** parameter refers to the *original* local index
    - In the "marker" mode:
        - the **parent** parameter refers to the new task's parent
        - the **tindex** parameter refers to the new local index

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Reordering Tasks](guides/reordering-tasks.md)


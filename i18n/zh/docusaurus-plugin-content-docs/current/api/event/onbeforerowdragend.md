---
sidebar_label: onBeforeRowDragEnd
title: onBeforeRowDragEnd event
description: "当用户在网格中放下（拖拽）一行时触发"
---

# onBeforeRowDragEnd

### Description

@short: 当用户在网格中放下某一行时触发

@signature: onBeforeRowDragEnd: (sid: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `sid` - (required) *string | number* - 要移动的任务的 ID
- `parent` - (required) *string | number* - 父级 ID。详见下文
- `tindex` - (required) *number* - 将要移动的起始位置的索引 <br/>（整棵树中的索引）。如果指定，<b>tindex</b> 将引用 'parent' 分支中的索引。详见下文

### Returns
- ` result` - (boolean) - 定义事件默认操作是否将被触发（<b>true</b>）还是取消（<b>false</b>）

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
- [分支排序](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
事件在左侧网格中通过鼠标指针移动任务时触发，且启用了 [order_branch](api/config/order_branch.md) 设置。如果禁用分支重新排序，将永远不会调用该事件。
:::

- 当事件被触发时，任务已经被移动到新位置，但仍可撤销更改
- 该事件是可中断的。返回 *false* 将取消操作并将任务移回原始位置
- 原始位置（parent 和 index）可从处理程序参数中获取
- 目标位置可以通过任务对象 [task.parent](guides/task-tree-operations.md#parent-of-a-task) 和 [gantt.getGlobalTaskIndex(taskId)](api/method/getglobaltaskindex.md) 获取
- The **parent** 与 **tindex** 参数的取值取决于所设置的 [order_branch](api/config/order_branch.md) 模式：
    - 在常规模式（"true"）：
        - **parent** 参数指向原始任务的父级（任务移动到新位置之前的父级）
        - **tindex** 参数指向原始本地索引
    - 在 "marker" 模式：
        - **parent** 参数指向新任务的父级
        - **tindex** 参数指向新本地索引

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [重新排序任务](guides/reordering-tasks.md)
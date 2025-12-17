---
sidebar_label: onBeforeRowDragEnd
title: onBeforeRowDragEnd event
description: "当用户在grid中拖放一行时触发。"
---

# onBeforeRowDragEnd

### Description

@short: 当用户在grid中拖放一行时触发。

@signature: onBeforeRowDragEnd: (sid: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `sid` - (required) *string | number* - 被移动任务的ID
- `parent` - (required) *string | number* - 父节点ID。详细说明见下文
- `tindex` - (required) *number* - 任务被移动前的位置索引 <br>（整个树中的索引）。如果指定，<b>tindex</b>对应于"parent"分支中的索引。详见下文

### Returns
- ` result` - (boolean) - 决定默认事件动作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

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

当使用鼠标在左侧grid中移动任务时触发此事件，前提是启用了[order_branch](api/config/order_branch.md)设置。如果关闭了分支重新排序功能，则不会触发此事件。
 
:::

- 事件触发时，任务已经被移动到新位置，但更改仍可撤销
- 事件可以被阻止。返回*false*会取消操作并将任务返回到原始位置
- 处理函数会接收到任务的原始位置（父节点和索引）作为参数
- 目标位置可以通过任务对象的[task.parent](guides/task-tree-operations.md#renwudefurenwu)和[gantt.getGlobalTaskIndex(taskId)](api/method/getglobaltaskindex.md)访问
- **parent**和**tindex**参数根据[order_branch](api/config/order_branch.md)模式不同而不同:
    - 在标准模式（"true"）下:
        - **parent**参数指任务的*原始*父节点（移动前）
        - **tindex**参数指*原始*局部索引
    - 在"marker"模式下:
        - **parent**参数指任务的新父节点
        - **tindex**参数指新局部索引

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [任务重新排序](guides/reordering-tasks.md)


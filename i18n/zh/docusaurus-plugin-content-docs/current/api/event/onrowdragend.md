---
sidebar_label: onRowDragEnd
title: onRowDragEnd event
description: "当用户在grid中垂直重新排序并放下某一行后触发"
---

# onRowDragEnd

### Description

@short: 当用户在grid中垂直重新排序并放下某一行后触发

@signature: onRowDragEnd: (id: string | number, target: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 被垂直拖动的任务ID
- `target` - (required) *string | number* - 拖动行所替代位置的目标任务ID

### Example

~~~jsx
gantt.attachEvent("onRowDragEnd", function(id, target) {
    // 可以在这里添加自定义逻辑
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note

当启用 [order_branch](api/config/order_branch.md) 设置时，该事件会在用户使用鼠标在左侧grid中移动任务时触发。如果分支重新排序功能关闭，则该事件不会被调用。
 
:::

**target** 参数包含了被移动任务最近的任务ID，该任务要么紧挨着被移动任务之前，要么紧挨着之后。

该值有两种可能的格式:

- *target=targetId* - 被移动任务应放置在目标任务 targetId 的**前面**
- *target=next:targetId* - 被移动任务应放置在目标任务 targetId 的**后面**（当替换的是图表中的最后一个任务时发生）

下面是一个示例，展示如何提取 *next:targetId* 格式中的目标ID:

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
- [任务重新排序](guides/reordering-tasks.md)


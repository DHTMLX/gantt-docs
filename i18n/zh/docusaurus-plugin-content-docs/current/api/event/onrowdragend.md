---
sidebar_label: onRowDragEnd
title: onRowDragEnd 事件
description: "在网格中，用户放下一个垂直重新排序的行后触发"
---

# onRowDragEnd

### Description

@short: 当用户在网格中释放一个垂直重新排序的行时触发

@signature: onRowDragEnd: (id: string | number, target: string | number) =\> void;

### Parameters

- `id` - (必填) *string | number* - 用户在网格中垂直拖动的任务的 id
- `target` - (必填) *string | number* - 拖动的行最终所处的目标任务的 id

### Example

~~~jsx
gantt.attachEvent("onRowDragEnd", function(id, target) {
    // 在这里插入您的自定义逻辑 
});
~~~

### Related samples
- [分支排序](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
当在左侧网格中使用鼠标移动任务时触发该事件，前提是启用了 [order_branch] 设置。若禁用分支重新排序，则不会调用该事件。
:::

The **target** 参数将包含紧邻当前任务之前或之后最近的任务的 id。

它的值可能以以下两种格式之一出现：

- *target=targetId* - 当前任务应位于 targetId 任务之前
- *target=next:targetId* - 当前任务应位于 targetId 任务之后（如果你替换了图表中的最后一个任务，则会发生）

在 *next:targetId* 格式中获取目标 id 的示例：

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
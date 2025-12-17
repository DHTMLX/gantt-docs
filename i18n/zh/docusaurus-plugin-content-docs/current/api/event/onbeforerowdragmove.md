---
sidebar_label: onBeforeRowDragMove
title: onBeforeRowDragMove event
description: "在网格中某行垂直拖动到新位置之前触发"
---

# onBeforeRowDragMove

### Description

@short: 在网格中某行垂直拖动到新位置之前触发

@signature: onBeforeRowDragMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 被拖动任务在网格中的id
- `parent` - (required) *string | number* - 新父节点的id
- `tindex` - (required) *number* - 任务将在父分支中放置的目标索引位置

### Returns
- ` result` - (boolean) - 指示是否继续执行默认事件动作（<b>true</b>）或停止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeRowDragMove", function(id, parent, tindex){
    // return true/false;
});
~~~

### Details

此事件可以被阻止。返回 *false* 将防止行被移动。

:::note
 仅当选项 [order_branch](api/config/order_branch.md) 设置为 "marker" 时，此事件才会触发。 
:::

### Related API
- [order_branch](api/config/order_branch.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)


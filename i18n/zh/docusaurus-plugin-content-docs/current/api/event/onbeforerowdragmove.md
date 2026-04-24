---
sidebar_label: onBeforeRowDragMove
title: onBeforeRowDragMove 事件
description: "在网格中的某一行被垂直拖动到不同位置之前触发"
---

# onBeforeRowDragMove

### Description

@short: 在网格中的某一行被垂直拖动到不同位置之前触发

@signature: onBeforeRowDragMove: (id: string | number, parent: string | number, tindex: number) => boolean;

### Parameters

- `id` - (required) *string | number* - 要在网格中移动的任务的 id
- `parent` - (required) *string | number* - 父级 id
- `tindex` - (required) *number* - 将要移动到的父分支中的位置索引

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否会被触发（<b>true</b>）还是取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeRowDragMove", function(id, parent, tindex){
     // return true/false;
});
~~~

### Details

该事件是可阻止的。返回 *false* 以取消移动该行。

:::note
当选项 [order_branch](api/config/order_branch.md) 被设置为 "marker" 值时，才会触发该事件。 
:::

### Related API
- [order_branch](api/config/order_branch.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
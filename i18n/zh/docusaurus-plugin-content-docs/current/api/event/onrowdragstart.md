---
sidebar_label: onRowDragStart
title: onRowDragStart event
description: "在网格中某行被拖动进行垂直重排之前触发"
---

# onRowDragStart

### Description

@short: 在网格中某行被拖动进行垂直重排之前触发

@signature: onRowDragStart: (id: string | number, target: HTMLElement, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 正在拖动的任务ID
- `target` - (required) *HTMLElement* - 表示被拖动任务的HTML元素
- `e` - (required) *Event* - 与拖动操作相关的原生事件对象

### Returns
- ` result` - (boolean) - 决定事件的默认操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note

当使用鼠标在左侧grid区域拖动任务时触发此事件，仅在启用 [order_branch](api/config/order_branch.md) 选项时有效。如果关闭了分支重排功能，则此事件不会触发。
 
:::


通过返回 *false* 可以阻止此事件，从而阻止拖动开始。

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [任务重新排序](guides/reordering-tasks.md)


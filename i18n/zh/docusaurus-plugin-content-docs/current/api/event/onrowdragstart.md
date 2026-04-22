---
sidebar_label: onRowDragStart
title: onRowDragStart 事件
description: "在用户拖动网格中的一行以垂直重新排序之前触发"
---

# onRowDragStart

### Description

@short: 在用户拖动网格中的一行以垂直重新排序之前触发

@signature: onRowDragStart: (id: string | number, target: HTMLElement, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 用户在网格中拖动的任务的 ID
- `target` - (required) *HTMLElement* - 用户拖动的任务的 HTML 元素
- `e` - (required) *Event* - 原生事件对象

### Returns
- `result` - (boolean) - 定义事件默认行为是否会被触发（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Related samples
- [分支排序](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
当左侧网格中通过鼠标指针移动任务，并且启用 [order_branch](api/config/order_branch.md) 设置时，将触发此事件。如果分支重新排序被禁用，则永远不会调用该事件。
:::

该事件是可拦截的。返回 *false* 以取消拖动。

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [重新排序任务](guides/reordering-tasks.md)
---
sidebar_label: onBeforeTaskMove
title: onBeforeTaskMove 事件
description: "在任务被移动到新的垂直位置之前触发"
---

# onBeforeTaskMove

### Description

@short: 在任务被移动到新的垂直位置之前触发

@signature: onBeforeTaskMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 要移动的任务的 id
- `parent` - (required) *string | number* - 父级 id
- `tindex` - (required) *number* - 将要移动到的父分支中的位置索引

### Returns
- ` result` - (boolean) - 定义事件的默认动作是否会被触发（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
// 阻止移动到不同的子分支：
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    const task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

### Details

该事件是可阻塞的。返回 *false* 将取消任务的移动。

请注意，该事件在两种情况下触发：

1. 调用方法 [moveTask](api/method/movetask.md) 时
2. 当在默认模式下启用选项 [order_branch](api/config/order_branch.md)（*gantt.config.order_branch = true;*）且用户拖动任务时

### Related API
- [moveTask](api/method/movetask.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
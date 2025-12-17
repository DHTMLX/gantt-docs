---
sidebar_label: onBeforeTaskMove
title: onBeforeTaskMove event
description: "在任务垂直位置变化之前触发"
---

# onBeforeTaskMove

### Description

@short: 在任务垂直位置变化之前触发

@signature: onBeforeTaskMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 被移动任务的ID
- `parent` - (required) *string | number* - 新的父任务ID
- `tindex` - (required) *number* - 在父分支中的新位置索引

### Returns
- ` result` - (boolean) - 指示是否允许默认事件动作继续执行（<b>true</b>）或阻止（<b>false</b>）

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

此事件可以被阻止。返回 *false* 将阻止任务被移动。

请注意，此事件在以下两种情况下触发:

1. 调用方法 [moveTask](api/method/movetask.md) 时
2. 当选项 [order_branch](api/config/order_branch.md) 启用且为默认设置（*gantt.config.order_branch = true;*）时，用户拖动任务时触发

### Related API
- [moveTask](api/method/movetask.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)


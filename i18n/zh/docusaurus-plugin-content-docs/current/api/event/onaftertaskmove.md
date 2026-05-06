---
sidebar_label: onAfterTaskMove
title: onAfterTaskMove 事件
description: "在任务被移动到新的垂直位置后触发"
---

# onAfterTaskMove

### Description

@short: 任务移动到新的垂直位置后触发

@signature: onAfterTaskMove: (id: string | number, parent: string | number, tindex: number) =\> void;

### Parameters

- `id` - (required) *string | number* - 要移动的任务的 ID
- `parent` - (required) *string | number* - 父级 ID
- `tindex` - (required) *number* - 将任务移动到的父分支中的位置索引

### Example

~~~jsx
// 防止移动到另一个子分支
gantt.attachEvent("onAfterTaskMove", function(id, parent, tindex){
    // 在这里插入您的自定义逻辑
});
~~~

### Details

注意，该事件在以下两种情况下触发：

1. 当调用方法 [moveTask](api/method/movetask.md) 时
2. 当默认模式启用选项 [order_branch](api/config/order_branch.md) 且用户拖动任务时 (*gantt.config.order_branch = true;*)

### Related API
- [moveTask](api/method/movetask.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
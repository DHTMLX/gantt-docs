---
sidebar_label: onAfterTaskMove
title: onAfterTaskMove event
description: "在任务被移动到新的垂直位置后立即触发"
---

# onAfterTaskMove

### Description

@short: 在任务被移动到新的垂直位置后立即触发

@signature: onAfterTaskMove: (id: string | number, parent: string | number, tindex: number) =\> void;

### Parameters

- `id` - (required) *string | number* - 被移动任务的ID
- `parent` - (required) *string | number* - 新父任务的ID
- `tindex` - (required) *number* - 在父分支中的新位置索引

### Example

~~~jsx
// 防止移动到另一个子分支
gantt.attachEvent("onAfterTaskMove", function(id, parent, tindex){
    // 在这里编写自定义逻辑
});
~~~

### Details

请注意，该事件在以下两种情况下触发:

1. 调用方法 [moveTask](api/method/movetask.md) 时
2. 当选项 [order_branch](api/config/order_branch.md) 被启用且默认设置为 (*gantt.config.order_branch = true;*)，并且用户拖动任务时

### Related API
- [moveTask](api/method/movetask.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)


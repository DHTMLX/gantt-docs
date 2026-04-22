---
sidebar_label: onTaskUnselected
title: onTaskUnselected 事件
description: "在用户通过选择其他任务来取消选中某个任务时触发"
---

# onTaskUnselected

### Description

@short: 当用户通过选择其他任务来取消选中某个任务时触发

@signature: onTaskUnselected: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 被取消选中的任务的 ID

### Example

~~~jsx
gantt.attachEvent("onTaskUnselected", function(id){
    // 在这里插入您的自定义逻辑 
});
~~~

### Details

该事件会在多选范围中的每个任务上被调用。
如果启用 [multiselect](guides/extensions-list.md#multitaskselection) 扩展，
当用户从已选任务中移除选中时，该事件也会被触发。

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskSelected](api/event/ontaskselected.md)
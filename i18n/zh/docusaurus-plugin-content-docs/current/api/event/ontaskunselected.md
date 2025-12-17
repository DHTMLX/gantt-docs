---
sidebar_label: onTaskUnselected
title: onTaskUnselected event
description: "当用户通过选择其他任务取消选中某个任务时触发"
---

# onTaskUnselected

### Description

@short: 当用户通过选择其他任务取消选中某个任务时触发

@signature: onTaskUnselected: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 被取消选中的任务的id

### Example

~~~jsx
gantt.attachEvent("onTaskUnselected", function(id){
    // 可以在这里放置自定义逻辑
});
~~~

### Details

此事件会针对多选范围内的每个任务触发。

当启用 [multiselect](guides/extensions-list.md) 扩展时，每当用户从当前选择中移除某个任务时，也会触发该事件。

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskSelected](api/event/ontaskselected.md)


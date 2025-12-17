---
sidebar_label: onTaskSelected
title: onTaskSelected event
description: "当用户选择一个任务时触发"
---

# onTaskSelected

### Description

@short: 当用户选择一个任务时触发

@signature: onTaskSelected: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务的ID

### Example

~~~jsx
gantt.attachEvent("onTaskSelected", function(id){
    // 在这里编写自定义逻辑
});
~~~

### Details

此事件会针对多选范围内的每个任务触发。

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)


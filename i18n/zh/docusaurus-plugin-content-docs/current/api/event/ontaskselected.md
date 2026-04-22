---
sidebar_label: onTaskSelected
title: onTaskSelected 事件
description: "在用户选择一个任务时触发"
---

# onTaskSelected

### Description

@short: 当用户选择一个任务时触发

@signature: onTaskSelected: (id: string | number) =\> void;

### Parameters

- `id` - （必填）*string,number* - 任务的 id

### Example

~~~jsx
gantt.attachEvent("onTaskSelected", function(id){
    // 在这里插入您的自定义逻辑 
});
~~~

### Details

该事件会在多选范围内的每个任务上被触发。

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)
---
sidebar_label: eachParent
title: eachParent method
description: "遍历甘特图中指定任务的所有父任务"
---

# eachParent

### Description

@short: 遍历甘特图中指定任务的所有父任务

@signature: eachParent: (code: GanttCallback, startTask: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - 一个回调函数，用于处理每个任务对象
- `startTask` - (required) *string* - | number            要遍历其父任务的任务ID
- `master` - (optional) *object* - 回调函数内部使用的上下文对象，即回调函数中的 'this' 指向

### Example

~~~jsx
gantt.eachParent(function(task){
    alert(task.text);
}, taskId);
~~~

### Related API
- [calculateTaskLevel](api/method/calculatetasklevel.md)


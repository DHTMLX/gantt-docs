---
sidebar_label: eachParent
title: eachParent method
description: "在 Gantt 图中遍历指定任务的所有父任务"
---

# eachParent

### Description

@short: 遍历 Gantt 图中指定任务的所有父任务

@signature: eachParent: (code: GanttCallback, startTask: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - 将遍历任务的函数。接收一个任务对象作为参数
- `startTask` - (required) *string | number* - 要遍历其父级任务的目标项的 id

### Example

~~~jsx
gantt.eachParent(function(task){
    alert(task.text);
}, taskId);
~~~

### Related API
- [calculateTaskLevel](api/method/calculatetasklevel.md)
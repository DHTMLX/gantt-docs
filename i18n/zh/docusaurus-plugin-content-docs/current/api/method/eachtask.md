---
sidebar_label: eachTask
title: eachTask method
description: "遍历特定任务或整个甘特图的所有子任务"
---

# eachTask

### Description

@short: 遍历特定任务或整个甘特图的所有子任务

@signature: eachTask: (code: GanttCallback, parent?: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - 一个将被调用以处理每个任务的函数。该函数接收一个任务对象作为参数
- `parent` - (optional) *string | number* -           父任务的ID。如果提供，将只遍历指定父任务的子任务    
- `master` - (optional) *object* - 在函数内部将用作"this"的对象

### Example

~~~jsx
gantt.eachTask(function(task){alert(task.text);})
~~~

### Details

此方法执行一种[深度优先树遍历](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR))，从左到右访问每个任务。父任务会在其子任务之前被处理。

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)


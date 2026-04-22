---
sidebar_label: eachTask
title: eachTask 方法
description: "遍历指定任务的所有子任务，或整个甘特图中的所有任务"
---

# eachTask

### Description

@short: 迭代指定任务的所有子任务，或遍历整个甘特图中的所有任务

@signature: eachTask: (code: GanttCallback, parent?: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - 一个用于遍历任务的函数。参数为一个任务对象
- `parent` - (optional) *string | number* - 父任务的 id。如果指定，函数将遍历所指定父任务的子任务
- `master` - (optional) *object* - 将作为 this 引用的对象

### Example

~~~jsx
gantt.eachTask(function(task){alert(task.text);})
~~~

### Details

该方法使用 [depth-first tree traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR)) 从左到右遍历所有任务。每个父节点在其子节点之前被访问。

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
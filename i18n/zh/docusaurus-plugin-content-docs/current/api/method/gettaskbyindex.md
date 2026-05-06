---
sidebar_label: getTaskByIndex
title: getTaskByIndex 方法
description: "根据其全局任务索引返回一个任务"
---

# getTaskByIndex

### Description

@short: 根据其全局任务索引返回一个任务

@signature: getTaskByIndex: (index: number | string) =\> Task

### Parameters

- `index` - (必填) *number | string* -        树中的任务索引（从 0 开始编号）

### Returns
- ` task` - (Task) - 一个任务对象

### Example

~~~jsx
const globalTaskIndex = gantt.getGlobalTaskIndex(19); // -> 10

const task = gantt.getTaskByIndex(10); 
// -> {id:"19", text:"Task name", type:"project", order:"10", progress:0.4, …}
~~~

### Related API
- [getGlobalTaskIndex](api/method/getglobaltaskindex.md)
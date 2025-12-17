---
sidebar_label: getTaskByIndex
title: getTaskByIndex method
description: "根据全局任务索引返回对应的任务"
---

# getTaskByIndex

### Description

@short: 根据全局任务索引返回对应的任务

@signature: getTaskByIndex: (index: number | string) =\> Task

### Parameters

- `index` - (required) *number | string* -        任务在整体任务列表中的位置（从零开始）

### Returns
- ` task` - (Task) - 对应指定索引的任务对象

### Example

~~~jsx
const globalTaskIndex = gantt.getGlobalTaskIndex(19); // -> 10

const task = gantt.getTaskByIndex(10); 
// -> {id:"19", text:"Task name", type:"project", order:"10", progress:0.4, …}
~~~

### Related API
- [getGlobalTaskIndex](api/method/getglobaltaskindex.md)


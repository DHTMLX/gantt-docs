---
sidebar_label: getTaskByIndex
title: getTaskByIndex method
description: "returns a task by its global task index"
---

# getTaskByIndex

### Description

@short: Returns a task by its global task index

@signature: getTaskByIndex: (index: number | string) =\> Task

### Parameters

- `index` - (required) *number | string* -        the task index in the tree (zero-based numbering)

### Returns
- ` task` - (Task) - a task object

### Example

~~~jsx
const globalTaskIndex = gantt.getGlobalTaskIndex(19); // -> 10

const task = gantt.getTaskByIndex(10); 
// -> {id:"19", text:"Task name", type:"project", order:"10", progress:0.4, …}
~~~

### Related API
- [getGlobalTaskIndex](api/method/getglobaltaskindex.md)


---
sidebar_label: getTaskByIndex
title: getTaskByIndex method
description: "возвращает задачу на основе её глобального индекса задачи"
---

# getTaskByIndex

### Description

@short: Возвращает задачу на основе её глобального индекса задачи

@signature: getTaskByIndex: (index: number | string) =\> Task

### Parameters

- `index` - (required) *number | string* -        позиция задачи в общем списке задач (начинается с нуля)

### Returns
- ` task` - (Task) - объект задачи, соответствующий заданному индексу

### Example

~~~jsx
const globalTaskIndex = gantt.getGlobalTaskIndex(19); // -> 10

const task = gantt.getTaskByIndex(10); 
// -> {id:"19", text:"Task name", type:"project", order:"10", progress:0.4, …}
~~~

### Related API
- [getGlobalTaskIndex](api/method/getglobaltaskindex.md)


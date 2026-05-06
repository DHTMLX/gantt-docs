---
sidebar_label: getTaskByIndex
title: getTaskByIndex метод
description: "возвращает задачу по ее глобальному индексу задачи"
---

# getTaskByIndex

### Description

@short: Возвращает задачу по ее глобальному индексу задачи

@signature: getTaskByIndex: (index: number | string) =\> Task

### Parameters

- `index` - (required) *number | string* -        индекс задачи в дереве (нумерация с нуля)

### Returns
- ` task` - (Task) - объект задачи

### Example

~~~jsx
const globalTaskIndex = gantt.getGlobalTaskIndex(19); // -> 10

const task = gantt.getTaskByIndex(10); 
// -> {id:"19", text:"Task name", type:"project", order:"10", progress:0.4, …}
~~~

### Related API
- [getGlobalTaskIndex](api/method/getglobaltaskindex.md)
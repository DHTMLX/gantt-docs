---
sidebar_label: getTaskByIndex
title: getTaskByIndex method
description: "글로벌 작업 인덱스를 기준으로 작업을 반환합니다."
---

# getTaskByIndex

### Description

@short: 글로벌 작업 인덱스를 기준으로 작업을 반환합니다.

@signature: getTaskByIndex: (index: number | string) =\> Task

### Parameters

- `index` - (required) *number | string* -        전체 작업 목록에서 작업의 위치 (0부터 시작)

### Returns
- ` task` - (Task) - 주어진 인덱스에 해당하는 작업 객체

### Example

~~~jsx
const globalTaskIndex = gantt.getGlobalTaskIndex(19); // -> 10

const task = gantt.getTaskByIndex(10); 
// -> {id:"19", text:"Task name", type:"project", order:"10", progress:0.4, …}
~~~

### Related API
- [getGlobalTaskIndex](api/method/getglobaltaskindex.md)


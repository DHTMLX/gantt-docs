---
sidebar_label: getTaskByIndex
title: getTaskByIndex 메서드
description: "전역 태스크 인덱스로 태스크를 반환합니다"
---

# getTaskByIndex

### Description

@short: 전역 태스크 인덱스로 태스크를 반환합니다

@signature: getTaskByIndex: (index: number | string) =\> Task

### Parameters

- `index` - (required) *number | string* - 트리에서의 태스크 인덱스(제로 기반, 0부터 시작)

### Returns
- ` task` - (Task) - 태스크 객체

### Example

~~~jsx
const globalTaskIndex = gantt.getGlobalTaskIndex(19); // -> 10

const task = gantt.getTaskByIndex(10); 
// -> {id:"19", text:"Task name", type:"project", order:"10", progress:0.4, …}
~~~

### Related API
- [getGlobalTaskIndex](api/method/getglobaltaskindex.md)
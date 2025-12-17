---
sidebar_label: getGlobalTaskIndex
title: getGlobalTaskIndex method
description: "트리 전체에서 작업의 위치를 찾습니다."
---

# getGlobalTaskIndex

### Description

@short: 트리 전체에서 작업의 위치를 찾습니다.

@signature: getGlobalTaskIndex: (id: string | number) =\> number

### Parameters

- `id` - (required) *string | number* -        작업의 고유 식별자

### Returns
- ` index` - (number) - 트리 내 작업의 0부터 시작하는 위치 인덱스

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, 
         open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8,
         parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8,
         parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

var globalTaskIndex = gantt.getGlobalTaskIndex("t_1"); // -> 1 /*!*/
var taskIndex = gantt.getTaskIndex("t_1"); // -> 0
~~~

### Related API
- [getTaskIndex](api/method/gettaskindex.md)
- [getTaskByIndex](api/method/gettaskbyindex.md)


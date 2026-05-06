---
sidebar_label: getGlobalTaskIndex
title: getGlobalTaskIndex 메서드
description: "트리에 있는 태스크의 인덱스를 가져옵니다"
---

# getGlobalTaskIndex

### Description

@short: 트리에서 태스크의 인덱스를 가져옵니다

@signature: getGlobalTaskIndex: (id: string | number) =\> number

### Parameters

- `id` - (필수) *string | number* - 태스크 아이디

### Returns
- `index` - (number) - 트리에서의 태스크 인덱스(0부터 시작하는 번호)

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
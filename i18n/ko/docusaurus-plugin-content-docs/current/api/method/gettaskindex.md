---
sidebar_label: getTaskIndex
title: getTaskIndex method
description: "브랜치에서 태스크의 인덱스를 가져옵니다."
---

# getTaskIndex

### Description

@short: 브랜치의 태스크 인덱스를 가져옵니다

@signature: getTaskIndex: (id: string | number) =\> number

### Parameters

- `id` - (required) *string | number* - 태스크 ID

### Returns
- `index` - (number) - 브랜치의 태스크 인덱스(제로 베이스 번호)

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

const taskIndex = gantt.getTaskIndex("t_1"); // -> 0 /*!*/
const globalTaskIndex = gantt.getGlobalTaskIndex("t_1"); // -> 1
~~~

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Related API
- [getGlobalTaskIndex](api/method/getglobaltaskindex.md)
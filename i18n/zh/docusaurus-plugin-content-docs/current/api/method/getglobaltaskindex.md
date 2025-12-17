---
sidebar_label: getGlobalTaskIndex
title: getGlobalTaskIndex method
description: "查找任务在整个树结构中的位置"
---

# getGlobalTaskIndex

### Description

@short: 查找任务在整个树结构中的位置

@signature: getGlobalTaskIndex: (id: string | number) =\> number

### Parameters

- `id` - (required) *string | number* -        任务的唯一标识符

### Returns
- ` index` - (number) - 任务在树中的零基位置

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"项目 #1", start_date:"01-04-2013", duration:18, 
         open:true},
     {id:"t_1", text:"任务 #1", start_date:"02-04-2013", duration:8,
         parent:"p_1"},
     {id:"t_2", text:"任务 #2", start_date:"11-04-2013", duration:8,
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


---
sidebar_label: getGlobalTaskIndex
title: getGlobalTaskIndex method
description: "gets the index of a task in the tree"
---

# getGlobalTaskIndex

### Description

@short: Gets the index of a task in the tree

@signature: getGlobalTaskIndex: (id: string | number) =\> number

### Parameters

- `id` - (required) *string | number* -        the task id

### Returns
- ` index` - (number) - the task index in the tree (zero-based numbering)

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


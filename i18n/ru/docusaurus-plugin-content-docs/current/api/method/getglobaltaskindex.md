---
sidebar_label: getGlobalTaskIndex
title: getGlobalTaskIndex method
description: "Определяет позицию задачи в пределах всего дерева"
---

# getGlobalTaskIndex

### Description

@short: Определяет позицию задачи в пределах всего дерева

@signature: getGlobalTaskIndex: (id: string | number) =\> number

### Parameters

- `id` - (required) *string | number* -        уникальный идентификатор задачи

### Returns
- ` index` - (number) - позиция задачи в дереве, начиная с нуля

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


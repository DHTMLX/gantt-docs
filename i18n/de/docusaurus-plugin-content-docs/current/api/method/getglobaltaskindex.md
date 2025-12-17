---
sidebar_label: getGlobalTaskIndex
title: getGlobalTaskIndex method
description: "Findet die Position einer Aufgabe im gesamten Baum"
---

# getGlobalTaskIndex

### Description

@short: Findet die Position einer Aufgabe im gesamten Baum

@signature: getGlobalTaskIndex: (id: string | number) =\> number

### Parameters

- `id` - (required) *string | number* -        die eindeutige Kennung der Aufgabe

### Returns
- ` index` - (number) - die nullbasierte Position der Aufgabe im Baum

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Projekt #1", start_date:"01-04-2013", duration:18, 
         open:true},
     {id:"t_1", text:"Aufgabe #1", start_date:"02-04-2013", duration:8,
         parent:"p_1"},
     {id:"t_2", text:"Aufgabe #2", start_date:"11-04-2013", duration:8,
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


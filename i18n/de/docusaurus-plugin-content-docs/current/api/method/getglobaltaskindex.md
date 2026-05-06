---
sidebar_label: getGlobalTaskIndex
title: getGlobalTaskIndex Methode
description: "Ermittelt den Index einer Aufgabe im Baum"
---

# getGlobalTaskIndex

### Description

@short: Ermittelt den Index einer Aufgabe im Baum

@signature: getGlobalTaskIndex: (id: string | number) =\> number

### Parameters

- `id` - (required) *string | number* - die Aufgaben-ID

### Returns
- ` index` - (number) - der Task-Index im Baum (nullbasierte Nummerierung)

### Beispiel

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
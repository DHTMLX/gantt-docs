---
sidebar_label: unselectTask
title: unselectTask method
description: "removes selection from the selected task"
---

# unselectTask

### Description

@short: Removes selection from the selected task

@signature: unselectTask: (id?: string | number) =\> void

### Parameters

- `id`	-	(optional) *string | number*	-		optional, the id of the task to remove selection from, see details

### Example

~~~jsx
var tasks = {
 data:[
   {id:"p_1",  text:"Project #1", start_date:"01-04-2013", duration:18, open:true},
   {id:"t_1",  text:"Task #1",    start_date:"02-04-2013", duration:8,  parent:"p_1"},
   {id:"t_2",  text:"Task #2",    start_date:"11-04-2013", duration:8,  parent:"p_1"}
 ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.selectTask("t_1"); 
gantt.unselectTask(); /*!*/
~~~

### Details

The method invokes the [onTaskUnselected](api/event/ontaskunselected.md) event.

In case [multi-task selection](guides/multiselection.md) is enabled and there are several selected tasks, you need to pass as a parameter the id of the the task to remove selection from.

### Related API
- [selectTask](api/method/selecttask.md)
- [getSelectedId](api/method/getselectedid.md)


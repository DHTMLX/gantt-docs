---
sidebar_label: selectTask
title: selectTask method
description: "Wählt die angegebene Aufgabe aus"
---

# selectTask

### Description

@short: Wählt die angegebene Aufgabe aus

@signature: selectTask: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -        die ID der Aufgabe

### Returns
- ` id` - (string | number) - die ID der ausgewählten Aufgabe

### Example

~~~jsx
var tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8, parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8, parent:"p_1"}
   ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.selectTask("t_1"); /*!*/
~~~

### Details

Diese Methode löst das Event [onTaskSelected](api/event/ontaskselected.md) aus.

### Related API
- [unselectTask](api/method/unselecttask.md)
- [getSelectedId](api/method/getselectedid.md)


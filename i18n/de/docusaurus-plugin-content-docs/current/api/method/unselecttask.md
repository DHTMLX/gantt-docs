---
sidebar_label: unselectTask
title: unselectTask method
description: "Entfernt die Auswahl von der ausgewählten Aufgabe"
---

# unselectTask

### Description

@short: Entfernt die Auswahl von der ausgewählten Aufgabe

@signature: unselectTask: (id?: string | number) =\> void

### Parameters
- `id` - (optional) *string|number* - optionale Angabe, die ID der Aufgabe, von der die Auswahl entfernt werden soll, siehe Details

### Example

~~~jsx
var tasks = {
 data:[
   {id:"p_1",  text:"Projekt #1", start_date:"01-04-2013", duration:18, open:true},
   {id:"t_1",  text:"Aufgabe #1",    start_date:"02-04-2013", duration:8,  parent:"p_1"},
   {id:"t_2",  text:"Aufgabe #2",    start_date:"11-04-2013", duration:8,  parent:"p_1"}
 ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.selectTask("t_1"); 
gantt.unselectTask(); /*!*/
~~~

### Details

Diese Methode löst das Event [onTaskUnselected](api/event/ontaskunselected.md) aus.

Wenn die [Multi-Task-Auswahl](guides/multiselection.md) aktiviert ist und mehrere Aufgaben ausgewählt sind, sollten Sie die ID der Aufgabe, die Sie deselektieren möchten, als Parameter übergeben.

### Related API
- [selectTask](api/method/selecttask.md)
- [getSelectedId](api/method/getselectedid.md)


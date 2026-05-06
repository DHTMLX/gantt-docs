---
sidebar_label: unselectTask
title: unselectTask Methode
description: "Entfernt die Auswahl von der ausgewählten Aufgabe"
---

# unselectTask

### Description

@short: Entfernt die Auswahl von der ausgewählten Aufgabe

@signature: unselectTask: (id?: string | number) =\> void

### Parameters

- `id`	-	(optional) *string | number*	-		Optional, die ID der Aufgabe, von der die Auswahl entfernt werden soll, siehe Details

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

Die Methode löst das Event [onTaskUnselected](api/event/ontaskunselected.md) aus.

Falls die Mehrfachselektion von Aufgaben aktiviert ist und mehrere ausgewählte Aufgaben vorhanden sind, müssen Sie als Parameter die ID der Aufgabe übergeben, von der die Auswahl entfernt werden soll.

### Related API
- [selectTask](api/method/selecttask.md)
- [getSelectedId](api/method/getselectedid.md)
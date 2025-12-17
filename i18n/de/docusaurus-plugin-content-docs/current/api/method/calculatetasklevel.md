---
sidebar_label: calculateTaskLevel
title: calculateTaskLevel method
description: "ermittelt, wie tief eine Aufgabe innerhalb der Hierarchie verschachtelt ist"
---

# calculateTaskLevel

### Description

@short: Ermittelt, wie tief eine Aufgabe innerhalb der Hierarchie verschachtelt ist

@signature: calculateTaskLevel: (task: Task) =\> number

### Parameters

- `task` - (required) *Task* - das zu bewertende Aufgabenobjekt

### Returns
- ` level` - (number) - die Verschachtelungstiefe der Aufgabe in der Baumstruktur, beginnend bei null

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
 var level = gantt.calculateTaskLevel(task),
   types = gantt.config.types;
   
 //setzt den Aufgabentyp abhängig von der Verschachtelungsebene
 switch (level){
  case 0:
   task.type = types.project;
   break;
  case 1:
   task.type = types.subproject;
   break;
  default:
   task.type = types.task;
   break;
 }
 return true;
});
~~~

### Related API
- [calculateEndDate](api/method/calculateenddate.md)
- [calculateDuration](api/method/calculateduration.md)


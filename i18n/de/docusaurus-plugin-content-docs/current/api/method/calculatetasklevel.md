---
sidebar_label: calculateTaskLevel
title: calculateTaskLevel Methode
description: "Berechnet die Verschachtelungstiefe einer Aufgabe"
---

# calculateTaskLevel

### Description

@short: Berechnet die Verschachtelungstiefe einer Aufgabe

@signature: calculateTaskLevel: (task: Task) =\> number

### Parameters

- `task` - (required) *Task* - das Objekt der Aufgabe

### Returns
- `level` - (number) - die Ebene einer Aufgabe in der Baumhierarchie (nullbasierte Nummerierung)

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
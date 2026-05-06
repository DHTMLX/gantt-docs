---
sidebar_label: getTaskByTime
title: getTaskByTime Methode
description: "liefert eine Sammlung von Aufgaben, die während des angegebenen Zeitraums auftreten"
---

# getTaskByTime

### Description

@short: Liefert eine Sammlung von Aufgaben, die im angegebenen Zeitraum auftreten

@signature: getTaskByTime: (from?: Date, to?: Date) =\> Array\<Task\>

### Parameters
- `from` - (optional) *Date* -  das Startdatum des Zeitraums
- `to`- (optional) *Date* -  das Enddatum des Zeitraums

### Returns
- ` array` - (Array &lt;Task&gt;) - ein Array von Task-Objekten

### Example

~~~jsx
let tasks = gantt.getTaskByTime(new Date(2013,3,10),new Date(2013,4,10)); 
for (let i=0; i<tasks.length; i++){
       alert(tasks[i].text);
}
// or
tasks = gantt.getTaskByTime();//returns all tasks
~~~
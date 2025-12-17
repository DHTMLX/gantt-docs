---
sidebar_label: getTaskByTime
title: getTaskByTime method
description: "Ruft eine Liste von Aufgaben ab, die innerhalb eines bestimmten Zeitraums stattfinden"
---

# getTaskByTime

### Description

@short: Ruft eine Liste von Aufgaben ab, die innerhalb eines bestimmten Zeitraums stattfinden

@signature: getTaskByTime: (from?: Date, to?: Date) =\> Array\<Task\>

### Parameters
- `from` - (optional) *Date* - das Anfangsdatum des Zeitraums
- `to` - (optional) *Date* - das Enddatum des Zeitraums

### Returns
- ` array` - (Array &lt;Task&gt;) - ein Array, das Task-Objekte enthält

### Example

~~~jsx
let tasks = gantt.getTaskByTime(new Date(2013,3,10),new Date(2013,4,10)); 
for (let i=0; i<tasks.length; i++){
       alert(tasks[i].text);
}
// oder
tasks = gantt.getTaskByTime();//gibt alle Aufgaben zurück
~~~

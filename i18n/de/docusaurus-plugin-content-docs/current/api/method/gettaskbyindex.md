---
sidebar_label: getTaskByIndex
title: getTaskByIndex method
description: "gibt eine Aufgabe basierend auf ihrem globalen Aufgabenindex zurück"
---

# getTaskByIndex

### Description

@short: Gibt eine Aufgabe basierend auf ihrem globalen Aufgabenindex zurück

@signature: getTaskByIndex: (index: number | string) =\> Task

### Parameters

- `index` - (required) *number | string* -         die Position der Aufgabe in der gesamten Aufgabenliste (beginnend bei null)

### Returns
- ` task` - (Task) - das Aufgabenobjekt, das dem angegebenen Index entspricht

### Example

~~~jsx
const globalTaskIndex = gantt.getGlobalTaskIndex(19); // -> 10

const task = gantt.getTaskByIndex(10); 
// -> {id:"19", text:"Task name", type:"project", order:"10", progress:0.4, …}
~~~

### Related API
- [getGlobalTaskIndex](api/method/getglobaltaskindex.md)


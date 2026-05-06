---
sidebar_label: getTaskByIndex
title: getTaskByIndex Methode
description: "gibt eine Aufgabe anhand ihres globalen Aufgabenindex zurück"
---

# getTaskByIndex

### Description

@short: Liefert eine Aufgabe anhand ihres globalen Aufgabenindex

@signature: getTaskByIndex: (index: number | string) =\> Task

### Parameters

- `index` - (erforderlich) *number | string* -        der Aufgabenindex im Baum (nullbasierte Zählung)

### Returns
- ` task` - (Task) - ein Aufgabenobjekt

### Example

~~~jsx
const globalTaskIndex = gantt.getGlobalTaskIndex(19); // -> 10

const task = gantt.getTaskByIndex(10); 
// -> {id:"19", text:"Task name", type:"project", order:"10", progress:0.4, …}
~~~

### Related API
- [getGlobalTaskIndex](api/method/getglobaltaskindex.md)
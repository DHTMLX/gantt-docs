---
sidebar_label: getTaskByWBSCode
title: getTaskByWBSCode-Methode
description: "gibt eine Aufgabe anhand ihres WBS-Codes zurück"
---

# getTaskByWBSCode

### Description

@short: Gibt eine Aufgabe anhand ihres WBS-Codes zurück

@signature: getTaskByWBSCode: (code: string) =\> Task

### Parameters

- `code` - (required) *string* - der WBS-Code der Aufgabe

### Returns
- ` task` - (Task) - ein Task-Objekt

### Example

~~~jsx
const task = gantt.getTaskByWBSCode("1.2");
// => {id:"t1", text:"Task #1, unscheduled: true, duration: 1, …}
~~~

### Related samples
- [Task-WBS-Codes anzeigen (Outline-Nummern)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)

### Related API
- [getWBSCode](api/method/getwbscode.md)

### Related Guides
- [Spalten festlegen](guides/specifying-columns.md#wbscode)
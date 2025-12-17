---
sidebar_label: getTaskByWBSCode
title: getTaskByWBSCode method
description: "gibt eine Aufgabe basierend auf ihrem WBS-Code zurück"
---

# getTaskByWBSCode

### Description

@short: Gibt eine Aufgabe basierend auf ihrem WBS-Code zurück

@signature: getTaskByWBSCode: (code: string) =\> Task

### Parameters

- `code` - (required) *string* - der WBS-Code, der die Aufgabe identifiziert

### Returns
- ` task` - (Task) - das entsprechende Aufgabenobjekt

### Example

~~~jsx
const task = gantt.getTaskByWBSCode("1.2");
// => {id:"t1", text:"Task #1, unscheduled: true, duration: 1, …}
~~~

### Related samples
- [Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)

### Related API
- [getWBSCode](api/method/getwbscode.md)

### Related Guides
- ["Spalten festlegen"](guides/specifying-columns.md#wbscode)


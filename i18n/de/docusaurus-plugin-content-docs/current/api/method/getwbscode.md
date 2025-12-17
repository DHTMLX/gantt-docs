---
sidebar_label: getWBSCode
title: getWBSCode method
description: "gibt den WBS-Code (die Gliederungsnummer) einer Aufgabe zurück"
---

# getWBSCode

### Description

@short: Gibt den WBS-Code (die Gliederungsnummer) einer Aufgabe zurück

@signature: getWBSCode: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - das Aufgabenobjekt

### Returns
- ` wbs_code` - (string) - der WBS-Code der Aufgabe im Gantt-Diagramm

### Example

~~~jsx
gantt.init("gantt_here");

gantt.parse({
 "data":[
  {"id":1, "text":"Projekt #1", "start_date":"28-03-2013", "duration":"11", 
      "parent":"0", "open": true},
  {"id":2, "text":"Aufgabe #1", "start_date":"01-04-2013", "duration":"18", "parent":"1"},
  {"id":3, "text":"Aufgabe #2", "start_date":"02-04-2013", "duration":"8", "parent":"1"}
 ],
 "links":[]
});

const wbs_code = gantt.getWBSCode(gantt.getTask(3)) // -> gibt "1.2" zurück
~~~

### Related samples
- [Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)

### Details

hinzugefügt in Version 4.2

### Related API
- [getTaskByWBSCode](api/method/gettaskbywbscode.md)

### Related Guides
- ["Spalten festlegen"](guides/specifying-columns.md#wbscode)


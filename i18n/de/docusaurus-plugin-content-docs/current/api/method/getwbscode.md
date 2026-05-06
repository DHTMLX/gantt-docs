---
sidebar_label: getWBSCode
title: getWBSCode Methode
description: "liefert den WBS-Code (die Outline-Nummer) einer Aufgabe"
---

# getWBSCode

### Description

@short: Liefert den WBS-Code (die Outline-Nummer) einer Aufgabe

@signature: getWBSCode: (task: Task) =\> string

### Parameters

- `task` - (erforderlich) *Task* - das Objekt einer Aufgabe

### Returns
- ` wbs_code` - (string) - der WBS-Code der Aufgabe im Gantt

### Example

~~~jsx
gantt.init("gantt_here");

gantt.parse({
 "data":[
  {"id":1, "text":"Project #1", "start_date":"28-03-2013", "duration":"11", 
      "parent":"0", "open": true},
  {"id":2, "text":"Task #1", "start_date":"01-04-2013", "duration":"18", "parent":"1"},
  {"id":3, "text":"Task #2", "start_date":"02-04-2013", "duration":"8", "parent":"1"}
 ],
 "links":[]
});

const wbs_code = gantt.getWBSCode(gantt.getTask(3)) // -> returns "1.2"
~~~


### Related samples
- [Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)

### Details

hinzugefügt in Version 4.2

### Related API
- [getTaskByWBSCode](api/method/gettaskbywbscode.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#wbscode)
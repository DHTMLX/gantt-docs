---
sidebar_label: getWBSCode
title: getWBSCode method
description: "returns the WBS code (the outline number) of a task"
---

# getWBSCode

### Description

@short: Returns the WBS code (the outline number) of a task

@signature: getWBSCode: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - the object of a task

### Returns
- ` wbs_code` - (string) - the WBS code of the task in the gantt

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

added in version 4.2

### Related API
- [getTaskByWBSCode](api/method/gettaskbywbscode.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#wbscode)


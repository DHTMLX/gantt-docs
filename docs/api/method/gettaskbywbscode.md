---
sidebar_label: getTaskByWBSCode
title: getTaskByWBSCode method
description: "returns a task by its WBS code"
---

# getTaskByWBSCode

### Description

@short: Returns a task by its WBS code

@signature: getTaskByWBSCode: (code: string) =\> Task

### Parameters

- `code` - (required) *string* - the WBS code of the task

### Returns
- ` task` - (Task) - a task object

### Example

~~~jsx
const task = gantt.getTaskByWBSCode("1.2");
// => {id:"t1", text:"Task #1, unscheduled: true, duration: 1, …}
~~~

### Related samples
- [Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)

### Details

This legacy method looks up a display-order number from [getWBSCode](api/method/getwbscode.md). For a canonical outline number, use [getTaskByOutlineNumber](api/method/gettaskbyoutlinenumber.md).

### Related API
- [getWBSCode](api/method/getwbscode.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#wbscode)
- [WBS Codes and Task Numbering](guides/wbs-and-task-numbering.md)


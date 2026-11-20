---
sidebar_label: getOutlineNumber
title: getOutlineNumber method
description: "returns the outline number of a task"
---

# getOutlineNumber

### Description

@short: Returns the outline number of a task

@signature: getOutlineNumber: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - the task object

### Returns

A dotted outline number such as `"2.1"`, or an empty string for a task without an outline number.

### Example

~~~js
const number = gantt.getOutlineNumber(gantt.getTask(taskId));
~~~

### Details

Gantt derives the outline number from the task's position in the hierarchy. Sorting, filtering and collapsing the grid do not change it. When grouping is active, the number follows the grouped hierarchy.

This method is available in paid editions.

### Related API

- [getTaskByOutlineNumber](api/method/gettaskbyoutlinenumber.md)

### Related Guides

- [WBS Codes and Task Numbering](guides/wbs-and-task-numbering.md)

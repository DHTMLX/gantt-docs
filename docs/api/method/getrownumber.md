---
sidebar_label: getRowNumber
title: getRowNumber method
description: "returns the row number of a task"
---

# getRowNumber

### Description

@short: Returns the row number of a task

@signature: getRowNumber: (task: Task) =\> number

### Parameters

- `task` - (required) *Task* - the task object

### Returns

The one-based row number, or `0` for a task without a row number.

### Example

~~~js
const number = gantt.getRowNumber(gantt.getTask(taskId));
~~~

### Details

Row numbers count each task before its children. Sorting, filtering and collapsing the grid do not change them. Structural edits can renumber tasks. When grouping is active, numbering follows the grouped hierarchy and skips the generated group rows.

This method is available in paid editions.

### Related API

- [getTaskByRowNumber](api/method/gettaskbyrownumber.md)

### Related Guides

- [WBS Codes and Task Numbering](guides/wbs-and-task-numbering.md)

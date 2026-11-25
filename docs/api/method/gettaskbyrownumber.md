---
sidebar_label: getTaskByRowNumber
title: getTaskByRowNumber method
description: "finds a task by its row number"
---

# getTaskByRowNumber

### Description

@short: Finds a task by its row number

@signature: getTaskByRowNumber: (rowNumber: number) =\> Task | null

### Parameters

- `rowNumber` - (required) *number* - a positive integer

### Returns

The matching loaded task, or `null` if the number is invalid or has no match.

### Example

~~~js
const task = gantt.getTaskByRowNumber(5);
~~~

### Details

Pass the number returned by [getRowNumber](api/method/getrownumber.md) to look up a task.

This method is available in paid editions.

### Related API

- [getRowNumber](api/method/getrownumber.md)

### Related Guides

- [WBS Codes and Task Numbering](guides/wbs-and-task-numbering.md)

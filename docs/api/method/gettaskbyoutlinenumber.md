---
sidebar_label: getTaskByOutlineNumber
title: getTaskByOutlineNumber method
description: "finds a task by its outline number"
---

# getTaskByOutlineNumber

### Description

@short: Finds a task by its outline number

@signature: getTaskByOutlineNumber: (code: string) =\> Task | null

### Parameters

- `code` - (required) *string* - a dotted outline number such as `"2.1"`

### Returns

The matching loaded task, or `null` if the number is invalid or has no match.

### Example

~~~js
const task = gantt.getTaskByOutlineNumber("2.1");
~~~

### Details

Each part of the outline number must be a positive integer without leading zeros. Pass the value from [getOutlineNumber](api/method/getoutlinenumber.md) to look up a task.

This method is available in paid editions.

### Related API

- [getOutlineNumber](api/method/getoutlinenumber.md)

### Related Guides

- [WBS Codes and Task Numbering](guides/wbs-and-task-numbering.md)

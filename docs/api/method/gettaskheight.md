---
sidebar_label: getTaskHeight
title: getTaskHeight method
description: "returns the visible height of a task"
---

# getTaskHeight

### Description

@short: Returns the visible height of a task

@signature: getTaskHeight: (id?: string | number) =\> number

### Parameters
- `task` - (optional) *string | number* -  the task's id
### Returns
- ` height` - (number) - the height of the specified task or, if the <i>id</i> parameter is not specified, the height of the tasks

### Example

~~~jsx
const height = gantt.getTaskHeight(); // -> 30
~~~

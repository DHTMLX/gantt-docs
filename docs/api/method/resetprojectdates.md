---
sidebar_label: resetProjectDates
title: resetProjectDates method
description: "re-calculates the duration of a project task depending on the dates of its children"
---

# resetProjectDates

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Re-calculates the duration of a project task depending on the dates of its children

@signature: resetProjectDates: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - the task's object

### Example

~~~jsx
gantt.resetProjectDates(gantt.getTask(3));
~~~

### Details

The method modifies the **start_date**, **end_date** and **duration** properties of the provided object.

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)


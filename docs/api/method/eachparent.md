---
sidebar_label: eachParent
title: eachParent method
description: "iterates over all parent tasks of the specified task in the Gantt chart"
---

# eachParent

### Description

@short: Iterates over all parent tasks of the specified task in the Gantt chart

@signature: eachParent: (code: GanttCallback, startTask: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - a function that will iterate over tasks. Takes a task object as a parameter
- `startTask` - (required) *string | number* - the id of the item the parent tasks of which should be iterated over

### Example

~~~jsx
gantt.eachParent(function(task){
    alert(task.text);
}, taskId);
~~~

### Related API
- [calculateTaskLevel](api/method/calculatetasklevel.md)


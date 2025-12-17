---
sidebar_label: eachTask
title: eachTask method
description: "iterates over all child tasks of a specific task or the of whole Gantt chart"
---

# eachTask

### Description

@short: Iterates over all child tasks of a specific task or the of whole Gantt chart

@signature: eachTask: (code: GanttCallback, parent?: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - a function that will iterate over tasks. Takes a task object as a parameter
- `parent` - (optional) *string | number* - the parent id. If specified, the function will iterate over children of the
specified parent
- `master` - (optional) *object	* - 	the object, that 'this' will refer to

### Example

~~~jsx
gantt.eachTask(function(task){alert(task.text);})
~~~

### Details

The method uses [depth-first tree traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR)) from left to right to iterate over all tasks. Each parent node is visited before its child.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)


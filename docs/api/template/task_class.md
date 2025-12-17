---
sidebar_label: task_class
title: task_class template
description: "specifies the CSS class that will be applied to task bars"
---

# task_class

### Description

@short: Specifies the CSS class that will be applied to task bars

@signature: task_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - the date when a task is scheduled to begin  
- `end` - (required) *Date* - the date when a task is scheduled to be completed
- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string | void) - a CSS class for the item in question

### Example

~~~jsx
gantt.templates.task_class = function(start, end, task){return "";};
~~~

### Related Guides
- [Templates of the Timeline Area](guides/timeline-templates.md)

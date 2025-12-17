---
sidebar_label: task_text
title: task_text template
description: "specifies the text in the task bars and the header of the lightbox"
---

# task_text

### Description

@short: Specifies the text in the task bars and the header of the lightbox

@signature: task_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - the date when a task is scheduled to begin  
- `end` - (required) *Date* - the date when a task is scheduled to be completed
- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string | number | void) - an HTML text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.task_text=function(start, end, task){
    return task.text;
};
~~~

### Related Guides
- [Templates of the Timeline Area](guides/timeline-templates.md)

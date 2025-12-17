---
sidebar_label: progress_text
title: progress_text template
description: "specifies the text in the completed part of the task bar"
---

# progress_text

### Description

@short: Specifies the text in the completed part of the task bar

@signature: progress_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - the date when a task is scheduled to begin  
- `end` - (required) *Date* - the date when a task is scheduled to be completed
- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string | number | void) - an HTML text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.progress_text=function(start, end, task){return "";};
~~~

### Related samples
- [Text in the Progress bar](https://docs.dhtmlx.com/gantt/samples/04_customization/07_progress_text.html)

### Related Guides
- [Templates of the Timeline Area](guides/timeline-templates.md)

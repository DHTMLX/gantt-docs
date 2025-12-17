---
sidebar_label: rightside_text
title: rightside_text template
description: "specifies the text assigned to tasks bars on the right side"
---

# rightside_text

### Description

@short: Specifies the text assigned to tasks bars on the right side

@signature: rightside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - the date when a task is scheduled to begin
- `end` - (required) *Date* - the date when a task is scheduled to be completed
- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string | number | void) - an HTML text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.rightside_text = function(start, end, task){
    return "ID: #" + task.id;
};
~~~

### Related samples
- [Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [leftside_text](api/template/leftside_text.md)

### Related Guides
- [Templates of the Timeline Area](guides/timeline-templates.md)
- [Displaying Contents of Tasks](guides/text-block-for-task.md)


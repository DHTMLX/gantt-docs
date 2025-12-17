---
sidebar_label: leftside_text
title: leftside_text template
description: "specifies the text assigned to tasks bars on the left side"
---

# leftside_text

### Description

@short: Specifies the text assigned to tasks bars on the left side

@signature: leftside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - the date when a task is scheduled to begin
- `end` - (required) *Date* - the date when a task is scheduled to be completed
- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string | number | void) - an HTML text which will be rendered in the gantt

### Example

~~~jsx
const formatter = gantt.ext.formatters.durationFormatter({
    format: ["day"]
});

gantt.templates.leftside_text = function(start, end, task){
    return formatter.format(task.duration);
};
~~~

### Related samples
- [Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [rightside_text](api/template/rightside_text.md)

### Related Guides
- [Templates of the Timeline Area](guides/timeline-templates.md)
- [Displaying Contents of Tasks](guides/text-block-for-task.md)
- [Formatters Extension](guides/formatters-ext.md#durationformatter)


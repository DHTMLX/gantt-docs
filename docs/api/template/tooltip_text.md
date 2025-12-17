---
sidebar_label: tooltip_text
title: tooltip_text template
description: "specifies the text of tooltips"
---

# tooltip_text

### Description

@short: Specifies the text of tooltips

@signature: tooltip_text: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - the date when a task is scheduled to begin
- `end` - (required) *Date* - the date when a task is scheduled to be completed
- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string | void) - an HTML text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.tooltip_text = function(start,end,task){
    return "<b>Task:</b> "+task.text+"<br/><b>Start date:</b> " + 
    gantt.templates.tooltip_date_format(start)+ 
    "<br/><b>End date:</b> "+gantt.templates.tooltip_date_format(end);
};
~~~

### Details

:::note
This template is defined in the **tooltip** extension, so you need to activate the [tooltip](guides/extensions-list.md#tooltip) plugin. Read the details in the [Tooltips for Gantt Elements](guides/tooltips.md) article. 
:::

### Related API
- [tooltip_date_format](api/template/tooltip_date_format.md)

### Related Guides
- [Templates of Tooltips](guides/tooltip-templates.md)
- [Tooltips for Gantt Elements](guides/tooltips.md)


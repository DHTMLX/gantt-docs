---
sidebar_label: quick_info_title
title: quick_info_title template
description: "specifies the title of the pop-up edit form"
---

# quick_info_title

### Description

@short: Specifies the title of the pop-up edit form

@signature: quick_info_title: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - the date when a task is scheduled to begin
- `end` - (required) *Date* - the date when a task is scheduled to be completed
- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string | number | void) - an HTML text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.quick_info_title = function(start, end, task){ 
       return ev.text.substr(0,50); 
};
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
This template is defined in the **Quick Info** extension, so you need to activate the [quick_info](guides/extensions-list.md#quick-info) plugin. 
:::

### Related Guides
- [Templates of the 'Quick Info' Extension (Touch Support)](guides/touch-templates.md)

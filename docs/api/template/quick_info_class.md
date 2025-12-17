---
sidebar_label: quick_info_class
title: quick_info_class template
description: "specifies the CSS class that will be applied to the pop-up edit form"
---

# quick_info_class

### Description

@short: Specifies the CSS class that will be applied to the pop-up edit form

@signature: quick_info_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - the date when a task is scheduled to begin
- `end` - (required) *Date* - the date when a task is scheduled to be completed
- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string | void) - a class name that will be applied to the Quick Info popup

### Example

~~~jsx
gantt.templates.quick_info_class = function(start, end, task){ 
    return task.type == gantt.config.types.milestone ? "milestone_popup" : "";
};
~~~

### Details

:::note
This template is defined in the **Quick Info** extension, so you need to activate the [quick_info](guides/extensions-list.md#quick-info) plugin. 
:::

### Related Guides
- [Templates of the 'Quick Info' Extension (Touch Support)](guides/touch-templates.md)

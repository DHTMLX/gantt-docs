---
sidebar_label: lightbox_header
title: lightbox_header template
description: "specifies the lightbox's header"
---

# lightbox_header

### Description

@short: Specifies the lightbox's header

@signature: lightbox_header: (start_date: Date, end_date: Date, task: Task) =\> string;

### Parameters

- `start_date` - (required) *Date* - the date when a task is scheduled to begin   
- `end_date` - (required) *Date* - the date when a task is scheduled to be completed
- `task` - (required) *Task* - the task's object

### Returns
- ` text` - (string) - an HTML text for rendering in the gantt

### Example

~~~jsx
gantt.templates.lightbox_header = function(start_date,end_date,task){
    return gantt.templates.task_time(task.start_date, task.end_date, task)  +  "&nbsp;" +
    (gantt.templates.task_text(task.start_date, task.end_date, task) || "").substr(0, 70);
};
~~~

### Related Guides
- [Templates of the Lightbox](guides/lightbox-templates.md)

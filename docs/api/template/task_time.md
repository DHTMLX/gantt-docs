---
sidebar_label: task_time
title: task_time template
description: "specifies the date period in the header of the lightbox"
---

# task_time

### Description

@short: Specifies the date period in the header of the lightbox

@signature: task_time: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - the date when a task is scheduled to begin  
- `end` - (required) *Date* - the date when a task is scheduled to be completed
- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.task_time = function(start,end,task){
    return gantt.templates.task_date(start)+" - "+gantt.templates.task_end_date(end);
};
~~~

### Related API
- [task_date](api/template/task_date.md)
- [task_end_date](api/template/task_end_date.md)

### Related Guides
- [Templates of the Lightbox](guides/lightbox-templates.md)


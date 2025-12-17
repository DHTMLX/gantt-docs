---
sidebar_label: task_unscheduled_time
title: task_unscheduled_time template
description: "specifies the dates of unscheduled tasks"
---

# task_unscheduled_time

### Description

@short: Specifies the dates of unscheduled tasks

@signature: task_unscheduled_time: (task: Task) =\> string | void;

### Parameters

- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string | void) - an HTML text which will be rendered in the grid for the columns with the Date values

### Example

~~~jsx
gantt.templates.task_unscheduled_time = function(task){
   return "";
};
~~~

### Related samples
- [Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

By default, returns an empty string.

If a task is [unscheduled](guides/unscheduled-tasks.md), i.e. has the `unscheduled:true` property in its configuraion object, all its dates will be rendered with empty rows. 
Check the example below:

:::note
sample: [Rendering dates in unscheduled tasks ](https://snippet.dhtmlx.com/t6skfgjx )
:::

In case you need to show some dates for an unscheduled task, you can do it with the help of the [date_grid](api/template/date_grid.md) template.

### Related API
- [show_unscheduled](api/config/show_unscheduled.md)

### Related Guides
- [Basic Operations with Tasks](guides/unscheduled-tasks.md)


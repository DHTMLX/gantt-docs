---
sidebar_label: date_grid
title: date_grid template
description: "specifies the content of columns that show dates (return `Date` values) in grid"
---

# date_grid

### Description

@short: Specifies the content of columns that show dates (return `Date` values) in grid

@signature: date_grid: (date: Date, task: Task, column: string) =\> string;

### Parameters

- `date` - (required) *Date* - the date which needs formatting
- `task` - (required) *Task* - the task object
- `column` - (required) *string* - the name of the column that called the template

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.date_grid = function(date, task, column){
   if(task && gantt.isUnscheduledTask(task) && gantt.config.show_unscheduled){
        return gantt.templates.task_unscheduled_time(task);
       }else{
        return gantt.templates.grid_date_format(date);
   }
}
~~~

### Related samples
- [Gantt. Setting the format of columns with dates in grid](https://snippet.dhtmlx.com/87j43fc3)

### Related API
- [date_grid](api/config/date_grid.md)
- [grid_date_format](api/template/grid_date_format.md)

### Related Guides
- [Templates of the Grid](guides/table-templates.md)


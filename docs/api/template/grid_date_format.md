---
sidebar_label: grid_date_format
title: grid_date_format template
description: "specifies the format of dates for the columns that show dates (return the `Date` values)"
---

# grid_date_format

### Description

@short: Specifies the format of dates for the columns that show dates (return the `Date` values)

@signature: grid_date_format: (date: Date, column?: string) =\> string;

### Parameters

- `date` - (required) *Date* - the date which needs formatting
- `column` - (optinal) *string* - the name of the column that called the template

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.grid_date_format = function(date, column){
    return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

### Details

The template function is called for all tasks, except for the unscheduled ones. 

:::note
The **grid_date_format** template is used only by the [date_grid](api/template/date_grid.md) template, so if you make some changes in it, **grid_date_format** will be affected. 
:::

### Related API
- [task_end_date](api/template/task_end_date.md)

### Related Guides
- [Templates of the Grid](guides/table-templates.md)


---
sidebar_label: grid_row_class
title: grid_row_class template
description: "specifies the CSS class that will be applied to a grid row"
---

# grid_row_class

### Description

@short: Specifies the CSS class that will be applied to a grid row

@signature: grid_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - the date when a task is scheduled to begin
- `end` - (required) *Date* - the date when a task is scheduled to be completed
- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string | void) - a CSS class for the item in question

### Example

~~~jsx
gantt.templates.grid_row_class = function(start, end, task){
    return "";
};
~~~

### Details

Every other row of the grid and the timeline area contains an extra css class named **odd** that can be used to alternate colors of rows:

~~~css
.gantt_row.odd, .gantt_task_row.odd{
    background: silver;
}

.gantt_row, .gantt_task_row {
    background: white;
}
~~~

By default, the styles will be applied only to even rows. To style odd rows, you need to add the **odd** class name to the style rule selectors. Therefore, if you want to assign the same color to all rows, you usually need to specify a css rule for both selectors (with and without '.odd' class), otherwise the default css rules [become more specific and get higher priority](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity).

~~~css
.gantt_row.odd, .gantt_task_row.odd,
.gantt_row, .gantt_task_row {
{
    background: white;
}
~~~

The same works for the custom css classes which you can apply via the [grid_row_class](api/template/grid_row_class.md) and [task_row_class](api/template/task_row_class.md) templates:


~~~js
gantt.templates.grid_row_class = function(start, end, task){
    return "wheat_color";
};
~~~

~~~css
.wheat_color,
.wheat_color.odd{
    background:wheat;
}
~~~

You may notice that the even rows are highlighted on the screen instead of the odd ones.
But if you check the [indexes of rows](api/method/gettaskindex.md), you will see that the style is applied to the rows that have odd indexes (1, 3, 5, etc.).

### Related Guides
- [Templates of the Grid](guides/table-templates.md)


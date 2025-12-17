---
sidebar_label: date_grid
title: date_grid config
description: "sets the format of dates in the 'Start time' column of the table"
---

# date_grid

### Description

@short: Sets the format of dates in the "Start time" column of the table

@signature: date_grid: string

### Example

~~~jsx
gantt.config.date_grid = "%d/%m/%Y";

gantt.init("gantt_here");
~~~

**Default value:** "%Y-%m-%d"

### Details

To change the **grid_date** config dynamically (for instance, after a user changes the locale language), you need to redefine the [grid_date_format](api/template/grid_date_format.md) template:

~~~js
function change_grid_date(){
  gantt.config.date_grid = "%d.%m.%Y";
  gantt.render()
}
gantt.templates.grid_date_format = function(date, column){
  return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

**Related sample:** [Changing date in grid dynamically](https://snippet.dhtmlx.com/qo5s7lfs)

### Related API
- [date_grid](api/template/date_grid.md)


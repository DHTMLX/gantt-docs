---
sidebar_label: templates
title: templates config
description: "defines formatting templates for dates, titles, tooltips in the Gantt chart"
---

# templates

### Description

@short: Defines formatting templates for dates, titles, tooltips in the Gantt chart

@signature: templates: GanttTemplates

### Example

~~~jsx
//specifies the format of the date in the 'Start Time' column of the table
gantt.templates.date_grid = function(date){
    return gantt.date.str_to_date(gantt.config.date_grid);
};
~~~

### Details

The properties of the **templates** object are described in a separate chapter of 
the root API page "Gantt API: Templates".

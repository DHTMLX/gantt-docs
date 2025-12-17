---
sidebar_label: timeline_cell_class
title: timeline_cell_class template
description: "specifies the CSS class that will be applied to the cells of the timeline area"
---

# timeline_cell_class

### Description

@short: Specifies the CSS class that will be applied to the cells of the timeline area

@signature: timeline_cell_class: (item: any, date: Date) =\> string | void;

### Parameters

- `item` - (required) *Task | object* -         either the task's or resource's object assigned to the row
- `date` - (required) *Date* - the date of a cell

### Returns
- ` text` - (string | void) - a CSS class for the item in question

### Example

~~~jsx
<style>
.weekend{ background: #f4f7f4 !important;}
</style>

gantt.templates.timeline_cell_class = function(task,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
~~~

### Related samples
- [Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)

### Details

Note that while using [work time calculations](guides/working-time.md), you can use [isWorkTime](api/method/isworktime.md) instead of hardcoded values:

~~~js
gantt.config.work_time = true;

gantt.templates.timeline_cell_class = function(task,date){
    if(!gantt.isWorkTime({task:task, date:date}))
        return "weekend";
};
~~~

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)
- [task_row_class](api/template/task_row_class.md)
- [task_class](api/template/task_class.md)
- [timeline_placeholder](api/config/timeline_placeholder.md)

### Related Guides
- [Templates of the Timeline Area](guides/timeline-templates.md)
- [Highlighting  Time Slots](guides/highlighting-time-slots.md)
- [Work Time Calculation](guides/working-time.md)


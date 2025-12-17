---
sidebar_label: scale_cell_class
title: scale_cell_class template
description: "specifies the CSS class that will be applied to cells of the time scale of the timeline area"
---

# scale_cell_class

### Description

@short: Specifies the CSS class that will be applied to cells of the time scale of the timeline area

@signature: scale_cell_class: (date: Date) =\> string | void;

### Parameters

- `date` - (required) *Date* - the date of a cell

### Returns
- ` text` - (string | void) - a CSS class for the item in question

### Example

~~~js
<style>
.weekend{ background: #f4f7f4 !important;}
</style>
~~~
~~~js
gantt.templates.scale_cell_class = function(date){
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

gantt.templates.scale_cell_class = function(date){
       if(!gantt.isWorkTime(date))
          return true;
};
~~~

If you have specified several scales via the [gantt.config.scales](api/config/scales.md) property, the template will be applied only to the first scale. To specify the CSS class to the cells of any other scale, use the **css** attribute of the [gantt.config.scales](api/config/scales.md) property:

~~~js
gantt.config.scales = [
    { unit: "month", step: 1, date: "%F" },
    { unit: "week", step: 1, date: "%W" },
    {
        unit: "day", step: 1, date: "%d", css: function (date) { /*!*/
            if (!gantt.isWorkTime({ date: date })) { /*!*/
                return "weekend"; /*!*/
            } /*!*/
        } /*!*/
    },
];
~~~

### Related API
- [scale_row_class](api/template/scale_row_class.md)
- [timeline_cell_class](api/template/timeline_cell_class.md)

### Related Guides
- [Templates of the Timeline Area](guides/timeline-templates.md)
- [Hiding Time Units in the Scale](guides/custom-scale.md)
- [Highlighting  Time Slots](guides/highlighting-time-slots.md)
- [Work Time Calculation](guides/working-time.md)
- [Setting up Scale](guides/configuring-time-scale.md#styling)


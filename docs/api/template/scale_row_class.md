---
sidebar_label: scale_row_class
title: scale_row_class template
description: "specifies the CSS class that will be applied to the time scale"
---

# scale_row_class

### Description

@short: Specifies the CSS class that will be applied to the time scale

@signature: scale_row_class: (scale: Scale) =\> string | void;

### Parameters

- `scale` - (required) *Scale* - the scale's configuration object

### Returns
- ` text` - (string | void) - a CSS class for the item in question

### Example

~~~jsx
<style>
 .day_scale{ background-color: #C3C7D4;}
 .week_scale{ background-color: #E5DFE8;}
 .month_scale{ background-color: #DFE8DF;}
</style>
~~~
~~~js
gantt.templates.scale_row_class = function(scale){
    switch(scale.unit){
        case "day":
        return "day_scale";
           
        case "month":
        return "month_scale";
           
        default:// "week"
           return "week_scale";
    }
}
~~~

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)

### Related Guides
- [Templates of the Timeline Area](guides/timeline-templates.md)


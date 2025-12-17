---
sidebar_label: scale_row_class
title: scale_row_class template
description: "定义应用于时间刻度的 CSS 类"
---

# scale_row_class

### Description

@short: 定义应用于时间刻度的 CSS 类

@signature: scale_row_class: (scale: Scale) =\> string | void;

### Parameters

- `scale` - (required) *Scale* - 时间刻度的配置对象

### Returns
- ` text` - (string | void) - 分配给对应项的 CSS 类名

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
- [时间线区域的模板](guides/timeline-templates.md)


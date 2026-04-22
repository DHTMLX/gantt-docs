---
sidebar_label: scale_row_class
title: шаблон scale_row_class
description: "указывает CSS класс, который будет применяться к временной шкале"
---

# scale_row_class

### Description

@short: Указывает CSS класс, который будет применяться к временной шкале

@signature: scale_row_class: (scale: Scale) => string | void;

### Parameters

- `scale` - (required) *Scale* - объект конфигурации шкалы

### Returns
- `text` - (string | void) - CSS-класс для данного элемента

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
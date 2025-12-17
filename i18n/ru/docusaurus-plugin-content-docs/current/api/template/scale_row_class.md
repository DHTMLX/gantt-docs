---
sidebar_label: scale_row_class
title: scale_row_class template
description: "определяет CSS-класс, применяемый к шкале времени"
---

# scale_row_class

### Description

@short: Определяет CSS-класс, применяемый к шкале времени

@signature: scale_row_class: (scale: Scale) =\> string | void;

### Parameters

- `scale` - (required) *Scale* - объект конфигурации для шкалы

### Returns
- ` text` - (string | void) - CSS-класс, назначенный соответствующему элементу

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
- [Шаблоны области временной шкалы](guides/timeline-templates.md)


---
sidebar_label: scale_row_class
title: scale_row_class template
description: "definiert die CSS-Klasse, die auf die Zeitskala angewendet wird"
---

# scale_row_class

### Description

@short: Definiert die CSS-Klasse, die auf die Zeitskala angewendet wird

@signature: scale_row_class: (scale: Scale) =\> string | void;

### Parameters

- `scale` - (required) *Scale* - das Konfigurationsobjekt für die Skala

### Returns
- ` text` - (string | void) - die CSS-Klasse, die dem entsprechenden Element zugewiesen wird

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
- ["Vorlagen für den Timeline-Bereich"](guides/timeline-templates.md)


---
sidebar_label: keep_grid_width
title: keep_grid_width config
description: "Behält die ursprüngliche Grid-Breite bei, wenn die Spaltengrößen angepasst werden"
---

# keep_grid_width
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Behält die ursprüngliche Grid-Breite bei, wenn die Spaltengrößen angepasst werden

@signature: keep_grid_width: boolean

### Example

~~~jsx
gantt.config.columns = [
    { name:"text", tree:true, width:"*", resize:true },
    { name:"start_date", align: "center"},
    { name:"duration", align: "center", width:70 },
    { name:"add", width:44 }
];

gantt.config.keep_grid_width = true; /*!*/
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### Related Guides
- ["Spalten festlegen"](guides/specifying-columns.md)

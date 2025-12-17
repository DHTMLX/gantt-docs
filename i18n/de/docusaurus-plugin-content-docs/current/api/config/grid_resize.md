---
sidebar_label: grid_resize
title: grid_resize config
description: "Ermöglicht das Ändern der Größe des Grids durch Ziehen seines rechten Randes"
---

# grid_resize
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Ermöglicht das Ändern der Größe des Grids durch Ziehen seines rechten Randes

### Example

~~~jsx
gantt.config.columns = [
    { name:"text", tree:true, width:"*", resize:true },
    { name:"start_date", align: "center"},
    { name:"duration", align: "center", width:70 },
    { name:"add", width:44 }
];

gantt.config.grid_resize = true; /*!*/
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details


:::note
 Diese Eigenschaft ist jetzt veraltet. Verwenden Sie stattdessen [gantt.config.layout](api/config/layout.md) und konfigurieren Sie die grid- und resizer-Objekte nach Bedarf. Weitere Details finden Sie [hier](guides/layout-config.md#defaultlayout). 
:::

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows:[
    {
      cols: [
        {view: "grid", id: "grid", scrollX:"scrollHor", scrollY:"scrollVer"},
        {resizer: true, width: 1},
        {view: "timeline", id: "timeline", scrollX:"scrollHor", scrollY:"scrollVer"},
        {view: "scrollbar", scroll: "y", id:"scrollVer"}
      ]
     },
    {view: "scrollbar", scroll: "x", id:"scrollHor", height:20}
  ]
};
 
gantt.init("gantt_here");
~~~

### Related API
- [keep_grid_width](api/config/keep_grid_width.md)
- [min_grid_column_width](api/config/min_grid_column_width.md)

### Related Guides
- ["Spalten festlegen"](guides/specifying-columns.md)

### Change log
- Seit Version 5.0 als veraltet markiert


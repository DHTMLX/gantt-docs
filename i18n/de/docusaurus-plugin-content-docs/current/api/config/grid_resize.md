---
sidebar_label: grid_resize
title: grid_resize config
description: "macht das Grid durch Ziehen am rechten Gridrand größenverstellbar"
---

# grid_resize

:::warning
Die Eigenschaft ist veraltet.
:::

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Macht das Grid durch Ziehen am rechten Gridrand größenverstellbar

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

**Standardwert:** false

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

:::note
Die Eigenschaft ist veraltet. Verwenden Sie stattdessen [gantt.config.layout](api/config/layout.md) und geben Sie Grid- und Resizer-Objekte mit der erforderlichen Konfiguration innerhalb an. Weitere Details finden Sie hier [guides/layout-config.md#default-layout].
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
- [Specifying Columns](guides/specifying-columns.md)

### Change log
- veraltet seit Version 5.0
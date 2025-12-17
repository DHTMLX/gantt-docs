---
sidebar_label: grid_resize
title: grid_resize config
description: "makes the grid resizable by dragging the right grid's border"
---

# grid_resize

:::warning
The property is deprecated.
:::

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Makes the grid resizable by dragging the right grid's border

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
The property is deprecated. Use the [gantt.config.layout](api/config/layout.md) instead and specify grid and resizer objects with the necessary configuration inside. Check the details [here](guides/layout-config.md#default-layout). 
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
- deprecated since version 5.0


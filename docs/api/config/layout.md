---
sidebar_label: layout
title: layout config
description: "specifies the layout object"
---

# layout

### Description

@short: Specifies the layout object

@signature: layout: any

### Example

~~~jsx
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

### Details

:::note
Note that you should specify the configuration of layout before Gantt initialization. If you make changes in the layout, you need to refresh it using [resetLayout](api/method/resetlayout.md). 
:::

### Related API
- [resetLayout](api/method/resetlayout.md)

### Related Guides
- [Gantt Layout](guides/layout-config.md)
- [How-tos](guides/how-to.md#how-to-toggle-gridchart) (read how to toggle grid/chart)
- [How-tos](guides/how-to.md#how-to-toggle-the-resource-view) (read how to toggle the resource view)


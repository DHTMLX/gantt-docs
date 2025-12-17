---
sidebar_label: show_grid
title: show_grid config
description: "shows the grid area of the Gantt chart"
---

# show_grid

### Description

@short: Shows the grid area of the Gantt chart

@signature: show_grid: boolean

### Example

~~~jsx
//hides the grid area of the Gantt chart
gantt.config.show_grid = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

*gantt.config.show_grid = false* is useful when you need to hide the grid area of the Gantt chart quickly while *gantt.config.show_chart = false* serves to hide the timeline area. If you work in a simple layout, you'd better not use these two options together as it may cause an unexpected result. Instead of it, you should change the configuration of the layout via [gantt.config.layout](api/config/layout.md).


The **show_grid** config will only work if you have not changed [the default configuration of the layout](guides/layout-config.md#default-layout) via [gantt.config.layout](api/config/layout.md). In case you have configured a custom layout, then you have to create several custom configurations and to switch between them to hide/show the grid. 

:::note
sample: [Gantt. Toggle grid (custom layout) ](https://snippet.dhtmlx.com/omk98l0x)
:::

### Related API
- [show_chart](api/config/show_chart.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-toggle-gridchart)


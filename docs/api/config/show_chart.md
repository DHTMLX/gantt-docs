---
sidebar_label: show_chart
title: show_chart config
description: "shows the chart (timeline) area of the Gantt chart"
---

# show_chart

### Description

@short: Shows the chart (timeline) area of the Gantt chart

@signature: show_chart: boolean

### Example

~~~jsx
//hides the timeline area of the Gantt chart
gantt.config.show_chart = false;
gantt.init("gantt_here");
~~~

**Default value:** true (the chart is visible)

### Details

*gantt.config.show_chart = false* is useful when you need to hide the timeline area of the Gantt chart quickly while *gantt.config.show_grid = false* serves to hide the grid area. If you work in a simple layout, you'd better not use these two options together as it may cause an unexpected result. Instead of it, you should change the configuration of the layout via [gantt.config.layout](api/config/layout.md).

The **show_chart** config will only work if you have not changed [the default configuration of the layout](guides/layout-config.md#default-layout) via [gantt.config.layout](api/config/layout.md). In case you have configured a custom layout, then you have to create several custom configurations and to switch between them to hide/show the chart. 

:::note
sample: [Gantt. Toggle timeline (custom layout) ](https://snippet.dhtmlx.com/aukjyqc8)
:::

### Related API
- [show_grid](api/config/show_grid.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-toggle-gridchart)


---
sidebar_label: keep_grid_width
title: keep_grid_width config
description: "bewahrt die anfängliche Breite des Grids, während Spalten angepasst werden"
---

# keep_grid_width

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: 'bewahrt' die anfängliche Breite des Grids, während Spalten angepasst werden

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

**Standardwert:** false

### Related samples
- [Grid-Spaltengrößenänderungs-Ereignisse](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Related Guides
- [Spalten festlegen](guides/specifying-columns.md)
---
sidebar_label: keep_grid_width
title: keep_grid_width config
description: "'says' to preserve the initial grid's width while resizing columns within"
---

# keep_grid_width

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: 'says' to preserve the initial grid's width while resizing columns within

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
- [Specifying Columns](guides/specifying-columns.md)

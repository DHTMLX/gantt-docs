---
sidebar_label: keep_grid_width
title: keep_grid_width 配置
description: "“says” 用于在调整列宽时保持初始网格宽度"
---

# keep_grid_width

:::info
 此功能仅包含在 PRO 版本中。 
::: 

### Description

@short: 'says' 用于在调整列宽时保持初始网格宽度

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

**默认值：** false

### Related samples
- [网格列调整事件](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Related Guides
- [指定列](guides/specifying-columns.md)
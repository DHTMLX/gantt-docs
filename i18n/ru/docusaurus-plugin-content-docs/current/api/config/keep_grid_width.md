---
sidebar_label: keep_grid_width
title: keep_grid_width config
description: "Сохраняет исходную ширину grid при изменении размеров колонок"
---

# keep_grid_width
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Сохраняет исходную ширину grid при изменении размеров колонок

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
- [Указание колонок](guides/specifying-columns.md)

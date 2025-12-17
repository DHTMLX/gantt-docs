---
sidebar_label: grid_resize
title: grid_resize config
description: "允许通过拖动右侧边框来调整 grid 的大小"
---

# grid_resize
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 允许通过拖动右侧边框来调整 grid 的大小

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
 此属性现已废弃。请改用 [gantt.config.layout](api/config/layout.md) 并根据需要配置 grid 和 resizer 对象。更多详情请参见 [这里](guides/layout-config.md#morenbuju)。 
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
- [指定列](guides/specifying-columns.md)

### Change log
- 自版本 5.0 起标记为废弃。


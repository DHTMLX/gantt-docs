---
sidebar_label: grid_resize
title: grid_resize 配置
description: "通过拖动右侧网格的边框使网格可调整大小"
---

# grid_resize

:::warning
该属性已弃用。
:::

:::info
该功能仅在 PRO 版本中提供。 
:::
### Description

@short: 通过拖动右侧网格的边框使网格可调整大小

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

**默认值:** false

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

:::note
该属性已弃用。请改用 [gantt.config.layout](api/config/layout.md)，在其中指定 grid 和 resizer 对象及所需配置。详细信息见 [这里](guides/layout-config.md#default-layout)。 
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


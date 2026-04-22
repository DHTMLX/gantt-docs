---
sidebar_label: layout
title: layout config
description: "定义 layout 对象"
---

# layout

### Description

@short: 指定布局对象

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
请在 Gantt 初始化之前指定布局配置。若对布局进行修改，需要使用 [resetLayout](api/method/resetlayout.md) 进行刷新。
:::

### Related API
- [resetLayout](api/method/resetlayout.md)

### Related Guides
- [Gantt 布局](guides/layout-config.md)
- [How-tos](guides/how-to.md#how-to-toggle-gridchart) (了解如何切换网格/图表)
- [How-tos](guides/how-to.md#how-to-toggle-the-resource-view) (了解如何切换资源视图)
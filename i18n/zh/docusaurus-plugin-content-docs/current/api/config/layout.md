---
sidebar_label: layout
title: layout config
description: "定义 layout 对象"
---

# layout

### Description

@short: 定义 layout 对象

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
 layout 配置应在初始化甘特图之前设置。如果您之后更新了 layout，务必使用 [resetLayout](api/method/resetlayout.md) 进行刷新。 
:::

### Related API
- [resetLayout](api/method/resetlayout.md)

### Related Guides
- [Gantt 布局](guides/layout-config.md)
- [操作指南](guides/how-to.md) (阅读如何切换 grid/chart)
- [操作指南](guides/how-to.md) (阅读如何切换 resource 视图)


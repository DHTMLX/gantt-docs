---
sidebar_label: resetLayout
title: resetLayout method
description: "根据当前布局配置重建甘特图布局"
---

# resetLayout

### Description

@short: 根据当前布局配置重建甘特图布局

@signature: resetLayout: () =\> void

### Example

~~~jsx
gantt.init("gantt_here");

gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            cols: [
                {view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
                {resizer: true, width: 1},
                {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                {view: "scrollbar", id: "scrollVer"}
            ]
        },
        {view: "scrollbar", id: "scrollHor", height: 20}
    ]
};

gantt.resetLayout();
~~~

### Details

:::note
 此方法会清除通过 [addTaskLayer](api/method/addtasklayer.md) 和 [addLinkLayer](api/method/addlinklayer.md) 方法添加到时间线区域的任何自定义图层。
因此，调用 **gantt.resetLayout** 后，需要重新设置这些自定义图层，以确保它们正确显示在页面上。 
:::

### Related API
- [layout](api/config/layout.md)

### Related Guides
- [Gantt 布局](guides/layout-config.md)


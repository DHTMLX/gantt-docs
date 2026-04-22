---
sidebar_label: resetLayout
title: resetLayout 方法
description: "使用当前布局配置值重新构建甘特图布局"
---

# resetLayout

### Description

@short: 使用当前布局配置重新构建甘特图布局

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
此方法会移除通过 [addTaskLayer](api/method/addtasklayer.md) 和 [addLinkLayer](api/method/addlinklayer.md) 方法添加到时间线区域的自定义图层。
因此，在调用 **gantt.resetLayout** 方法之后，您需要重新定义这些自定义图层，才能在页面上显示它们。
:::

### Related API
- [layout](api/config/layout.md)

### Related Guides
- [Gantt Layout](guides/layout-config.md)
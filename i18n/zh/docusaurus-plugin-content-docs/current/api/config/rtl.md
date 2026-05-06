---
sidebar_label: rtl
title: rtl 配置
description: "将甘特图切换为从右到左模式"
---

# 从右到左

### Description

@short: 将甘特图切换为从右到左模式

@signature: rtl: boolean

### Example

~~~jsx
gantt.config.rtl = true;
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            cols: [
                {view: "scrollbar", id: "scrollVer"},
                {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                {resizer: true, width: 1},
                {view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"}
            ]
        },
        {view: "scrollbar", id: "scrollHor", height: 20}
    ]
};
gantt.init("gantt_here");
~~~

**默认值:** false

### Related samples
- [从右到左的甘特图](https://docs.dhtmlx.com/gantt/samples/10_layout/04_rtl.html)

### Details

将配置选项设为 **true** 将把时间线中的时间刻度方向以及网格中的行顺序改为从右到左。

它不会影响甘特图的 [布局](api/config/layout.md)，因此你需要重新定义布局，以便交换网格和时间线的位置。

你也可能希望为甘特图中的标签文本设置方向：[为甘特图中的标签文本设置方向](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)。

### Related Guides
- [RTL（从右到左）模式](guides/rtl-mode.md)
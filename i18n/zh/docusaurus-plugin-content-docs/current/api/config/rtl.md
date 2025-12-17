---
sidebar_label: rtl
title: rtl config
description: "切换 gantt 到从右到左模式"
---

# rtl

### Description

@short: 切换 gantt 到从右到左模式

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

**Default value:** false

### Related samples
- [Right to left gantt](https://docs.dhtmlx.com/gantt/samples/10_layout/04_rtl.html)

### Details

将此选项设置为 **true** 会将时间轴的时间刻度方向和 grid 的行顺序切换为从右到左。

此设置不会自动更新 gantt 的布局配置，因此需要您自行调整布局以交换 grid 和时间轴的位置。

您可能还需要[调整 gantt 中标签的文本方向](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)。

### Related Guides
- [RTL（从右到左）模式](guides/rtl-mode.md)

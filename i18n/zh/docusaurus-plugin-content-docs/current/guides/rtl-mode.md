---
title: "RTL（从右到左）模式"
sidebar_label: "RTL（从右到左）模式"
---

RTL（从右到左）模式
========================

![rtl_mode](/img/rtl_mode.png)

Gantt 图表支持从右到左（RTL）模式，可以通过 [rtl](api/config/rtl.md) 配置项进行激活。 
当该选项设置为 *true* 时，时间轴的时间刻度方向会发生变化，网格中的行顺序也会反转，从右向左排列。

~~~js
gantt.config.rtl = true;
~~~

启用 rtl 模式并不会自动更新 [gantt.config.layout](api/config/layout.md)，因此需要手动调整布局，将网格和时间轴的位置进行交换。可以按照如下方式设置:

~~~js
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
~~~


[Right to left gantt](https://docs.dhtmlx.com/gantt/samples/10_layout/04_rtl.html)


您还可以根据需要[调整甘特图中标签的文本方向](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)。


--- 
title: "RTL（从右到左）模式"
sidebar_label: "RTL（从右到左）模式"
---

# RTL（从右到左）模式

![rtl_mode](/img/rtl_mode.png)

你可以在从右到左模式下使用甘特图，该模式通过 [rtl](api/config/rtl.md) 配置选项启用。
将其设置为 *true*，将改变时间轴在时间线上的方向，以及网格中行的顺序，使其从右到左。

~~~js
gantt.config.rtl = true;
~~~

启用 rtl 模式不会影响甘特图的 [gantt.config.layout](api/config/layout.md)，因此您需要重新定义它以交换网格和时间线的位置。实现方式如下：

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

[从右到左的甘特图](https://docs.dhtmlx.com/gantt/samples/10_layout/04_rtl.html)

你也可能希望 [为甘特图中标签的文本设置方向](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)。
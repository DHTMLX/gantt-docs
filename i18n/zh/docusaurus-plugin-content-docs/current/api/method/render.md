---
sidebar_label: render
title: render method
description: "绘制整个甘特图"
---

# render

### Description

@short: 绘制整个甘特图

@signature: render: () =\> void

### Example

~~~jsx
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "day", step: 1, format: "%j, %D"}
];
gantt.init("gantt_here");

gantt.config.scales = [
    {unit: "day", step: 1, format: "%j, %D"}
];
gantt.render();
~~~

### Related samples
- [Dynamic scales](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)

### Details

[batchUpdate](api/method/batchupdate.md) 方法允许一次性更新多个任务或链接，并通过单次 render 避免多次更新和渲染的需求。

### Related Guides
- [动态更改刻度设置](guides/dynamic-scale.md)


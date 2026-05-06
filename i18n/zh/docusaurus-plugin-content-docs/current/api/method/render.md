---
sidebar_label: render
title: render method
description: "渲染整个甘特图"
---

# render

### Description

@short: 渲染整个甘特图

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

您可以使用 [batchUpdate](api/method/batchupdate.md) 方法一次性更新多個任務/連接，實現單次重新渲染，而不是多次更新並多次重新渲染。

### Related Guides
- [Dynamic Change of Scale Settings](guides/dynamic-scale.md)
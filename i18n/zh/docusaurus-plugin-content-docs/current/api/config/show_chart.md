---
sidebar_label: show_chart
title: show_chart config
description: "控制甘特图中时间线部分的可见性"
---

# show_chart

### Description

@short: 控制甘特图中时间线部分的可见性

@signature: show_chart: boolean

### Example

~~~jsx
// 隐藏甘特图的时间线部分
gantt.config.show_chart = false;
gantt.init("gantt_here");
~~~

**Default value:** true（时间线部分显示）

### Details

设置 *gantt.config.show_chart = false* 是快速隐藏甘特图时间线部分的方法，而 *gantt.config.show_grid = false* 则会隐藏网格部分。如果你使用的是简单布局，建议不要同时使用这两个选项，因为这可能导致意外的行为。更好的方式是通过调整 [gantt.config.layout](api/config/layout.md) 来配置布局。

**show_chart** 选项仅在布局保持其[默认配置](guides/layout-config.md#morenbuju)且未通过 [gantt.config.layout](api/config/layout.md) 修改时生效。如果你使用自定义布局，则需要定义多个自定义配置并在它们之间切换，以控制图表的可见性。<br> 

:::note
Sample: [Gantt. Toggle timeline (custom layout)](https://snippet.dhtmlx.com/aukjyqc8)
:::


### Related API
- [show_grid](api/config/show_grid.md)

### Related Guides
- [操作指南](guides/how-to.md#ruheqiehuanwanggetubiao)


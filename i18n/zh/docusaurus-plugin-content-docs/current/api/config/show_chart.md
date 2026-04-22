---
sidebar_label: show_chart
title: show_chart config
description: "显示甘特图的时间线区域"
---

# show_chart

### Description

@short: 显示甘特图的时间线区域

@signature: show_chart: boolean

### Example

~~~jsx
// 隐藏甘特图的时间线部分
gantt.config.show_chart = false;
gantt.init("gantt_here");
~~~

**Default value:** true（时间线部分显示）

### Details

*gantt.config.show_chart = false* 在需要快速隐藏甘特图的时间线区域时很有用，而 *gantt.config.show_grid = false* 则用于隐藏网格区域。若你在简单布局中工作，最好不要同时使用这两个选项，因为可能会导致意外的结果。相反，你应该通过 [gantt.config.layout](api/config/layout.md) 来改变布局的配置。

**show_chart** 选项仅在布局保持其[默认配置](guides/layout-config.md#morenbuju)且未通过 [gantt.config.layout](api/config/layout.md) 修改时生效。如果你使用自定义布局，则需要定义多个自定义配置并在它们之间切换，以控制图表的可见性。

:::note
sample: [甘特图：切换时间线（自定义布局）](https://snippet.dhtmlx.com/aukjyqc8)
:::

### Related API
- [show_grid](api/config/show_grid.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-toggle-gridchart)
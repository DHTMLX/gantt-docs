---
sidebar_label: show_grid
title: show_grid config
description: "控制甘特图中网格区域的可见性"
---

# show_grid

### Description

@short: 控制甘特图中网格区域的可见性

@signature: show_grid: boolean

### Example

~~~jsx
//隐藏甘特图的网格区域
gantt.config.show_grid = false;
gantt.init("gantt_here");
~~~

**Default value:** true（网格显示）

### Details

设置 *gantt.config.show_grid = false* 可以快速隐藏甘特图的网格区域，而 *gantt.config.show_chart = false* 则隐藏时间线区域。如果你使用的是简单布局，建议避免同时使用这两个选项，因为这可能导致意外行为。相反，可以通过调整 [gantt.config.layout](api/config/layout.md) 来配置布局。

**show_grid** 选项仅在你没有通过 [gantt.config.layout](api/config/layout.md) 修改[默认布局配置](guides/layout-config.md#morenbuju)时有效。如果你使用自定义布局，则需要创建多个自定义配置并在它们之间切换以显示或隐藏网格。<br> 

:::note
Sample: [https://snippet.dhtmlx.com/omk98l0x](Gantt. Toggle grid (custom layout)) 
:::

### Related API
- [show_chart](api/config/show_chart.md)

### Related Guides
- [操作指南](guides/how-to.md#ruheqiehuanwanggetubiao)


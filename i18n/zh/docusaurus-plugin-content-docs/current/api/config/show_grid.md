---
sidebar_label: show_grid
title: show_grid config
description: "显示甘特图的网格区域"
---

# show_grid

### Description

@short: 显示甘特图的网格区域

@signature: show_grid: boolean

### Example

~~~jsx
//隐藏甘特图的网格区域
gantt.config.show_grid = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

*gantt.config.show_grid = false* 在你需要快速隐藏甘特图网格区域时很有用，而 *gantt.config.show_chart = false* 则用于隐藏时间轴区域。如果你在一个简单的布局中工作，最好不要把这两个选项一起使用，因为它们可能导致意外结果。相反，你应该通过 [gantt.config.layout](api/config/layout.md) 来调整布局配置。

**show_grid** 选项仅在你没有通过 [gantt.config.layout](api/config/layout.md) 修改[默认布局配置](guides/layout-config.md#morenbuju)时有效。如果你使用自定义布局，则需要创建多个自定义配置并在它们之间切换以显示或隐藏网格。

:::note
sample: [Gantt. Toggle grid (custom layout) ](https://snippet.dhtmlx.com/omk98l0x)
:::

### Related API
- [show_chart](api/config/show_chart.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-toggle-gridchart)
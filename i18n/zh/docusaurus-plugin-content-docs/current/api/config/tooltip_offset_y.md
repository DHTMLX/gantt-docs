---
sidebar_label: tooltip_offset_y
title: tooltip_offset_y 配置
description: "设置 tooltip 位置的顶端偏移量（若为正值）"
---

# tooltip_offset_y

### Description

@short: 设置 tooltip 位置的顶端偏移量（若为正值）

@signature: tooltip_offset_y: number

### Example

~~~jsx
gantt.config.tooltip_offset_y = 40;

gantt.init("gantt_here");
~~~

**默认值：** 20

### Details

:::note
此选项在 **tooltip** 扩展中定义，因此需要激活 [tooltip](guides/extensions-list.md#tooltip) 插件。请参阅 [Tooltips for Gantt Elements](guides/tooltips.md) 文章中的详细信息。
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- [Tooltips for Gantt Elements](guides/tooltips.md)
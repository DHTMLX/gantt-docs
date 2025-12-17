---
sidebar_label: tooltip_offset_y
title: tooltip_offset_y config
description: "调整tooltip垂直方向的位置偏移，正值会使tooltip向下移动"
---

# tooltip_offset_y

### Description

@short: 调整tooltip垂直方向的位置偏移，正值会使tooltip向下移动

@signature: tooltip_offset_y: number

### Example

~~~jsx
gantt.config.tooltip_offset_y = 40;

gantt.init("gantt_here");
~~~

**Default value:** 20

### Details

:::note
 该选项是**tooltip**扩展的一部分，请确保启用了[tooltip](guides/extensions-list.md) 插件。更多信息请参阅 [Gantt 元素的工具提示](guides/tooltips.md) 文章。 
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- [Gantt 元素的工具提示](guides/tooltips.md)


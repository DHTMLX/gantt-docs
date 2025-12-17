---
sidebar_label: tooltip_offset_x
title: tooltip_offset_x config
description: "当设置为正值时，调整tooltip水平偏移量，使其向右移动"
---

# tooltip_offset_x

### Description

@short: 当设置为正值时，调整tooltip水平偏移量，使其向右移动

@signature: tooltip_offset_x: number

### Example

~~~jsx
gantt.config.tooltip_offset_x = 30;

gantt.init("gantt_here");
~~~

**Default value:** 10

### Details

:::note
 此选项属于**tooltip**扩展，因此请确保已启用[tooltip](guides/extensions-list.md)插件。更多详情请参见[Gantt 元素的工具提示](guides/tooltips.md)文章。 
:::

### Related API
- [tooltip_offset_y](api/config/tooltip_offset_y.md)

### Related Guides
- [Gantt 元素的工具提示](guides/tooltips.md)


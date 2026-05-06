---
sidebar_label: tooltip_offset_x
title: tooltip_offset_x 配置
description: "设置工具提示位置的右偏移量（正数时向右偏移）"
---

# tooltip_offset_x

### Description

@short: 设置工具提示位置的右偏移量（正数时为右偏）

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
- [Tooltips for Gantt Elements](guides/tooltips.md)
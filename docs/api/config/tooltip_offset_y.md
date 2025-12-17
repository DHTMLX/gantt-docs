---
sidebar_label: tooltip_offset_y
title: tooltip_offset_y config
description: "sets the top (if positive) offset of the tooltip's position"
---

# tooltip_offset_y

### Description

@short: Sets the top (if positive) offset of the tooltip's position

@signature: tooltip_offset_y: number

### Example

~~~jsx
gantt.config.tooltip_offset_y = 40;

gantt.init("gantt_here");
~~~

**Default value:** 20

### Details

:::note
This option is defined in the **tooltip** extension, so you need to activate the [tooltip](guides/extensions-list.md#tooltip) plugin. Read the details in the [Tooltips for Gantt Elements](guides/tooltips.md) article. 
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- [Tooltips for Gantt Elements](guides/tooltips.md)


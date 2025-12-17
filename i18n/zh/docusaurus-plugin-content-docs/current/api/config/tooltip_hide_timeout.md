---
sidebar_label: tooltip_hide_timeout
title: tooltip_hide_timeout config
description: "设置 tooltip 在消失前保持可见的时间，单位为毫秒"
---

# tooltip_hide_timeout

### Description

@short: 设置 tooltip 在消失前保持可见的时间，单位为毫秒

@signature: tooltip_hide_timeout: number

### Example

~~~jsx
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~

### Details

:::note
 此选项是 **tooltip** 扩展的一部分，因此请确保启用 [tooltip](guides/extensions-list.md) 插件。更多详情请参考 [Gantt 元素的工具提示](guides/tooltips.md) 文章。 
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- [Gantt 元素的工具提示](guides/tooltips.md)


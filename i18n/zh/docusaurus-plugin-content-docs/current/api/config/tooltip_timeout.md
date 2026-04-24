---
sidebar_label: tooltip_timeout
title: tooltip_timeout 配置
description: "设置在任务的 tooltip 显示前的毫秒超时"
---

# tooltip_timeout

### Description

@short: 设置在任务的 tooltip 显示前的毫秒超时

@signature: tooltip_timeout: number

### Example

~~~jsx
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~

**默认值:** 30

### Details

:::note
此选项在 **tooltip** 扩展中定义，因此您需要启用 [tooltip](guides/extensions-list.md#tooltip) 插件。有关详细信息，请参阅 [Gantt Elements 的工具提示](guides/tooltips.md) 文章。
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- [Gantt Elements 工具提示](guides/tooltips.md)
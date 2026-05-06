---
sidebar_label: tooltip_hide_timeout
title: tooltip_hide_timeout 配置
description: "设置工具提示在隐藏前的持续时间，单位为毫秒"
---

# tooltip_hide_timeout

### Description

@short: 设置工具提示在隐藏前的持续时间，单位为毫秒

@signature: tooltip_hide_timeout: number

### Example

~~~jsx
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~

### Details

:::note
此选项在 **tooltip** 扩展中定义，因此需要启用 [tooltip](guides/extensions-list.md#tooltip) 插件。请查阅 [Tooltips for Gantt Elements](guides/tooltips.md) 文章中的详细信息。
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- [Gantt Elements 的工具提示](guides/tooltips.md)
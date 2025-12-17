---
sidebar_label: tooltip_timeout
title: tooltip_timeout config
description: "指定任务tooltip出现前的延迟时间，单位为毫秒"
---

# tooltip_timeout

### Description

@short: 指定任务tooltip出现前的延迟时间，单位为毫秒

@signature: tooltip_timeout: number

### Example

~~~jsx
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~

**Default value:** 30

### Details

:::note
 该设置属于**tooltip**扩展，因此请确保已启用[tooltip](guides/extensions-list.md)插件。更多信息请参见[Gantt 元素的工具提示](guides/tooltips.md)文章。 
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- [Gantt 元素的工具提示](guides/tooltips.md)


---
sidebar_label: tooltip_hide_timeout
title: tooltip_hide_timeout config
description: "sets the length of time, in milliseconds, before the tooltip hides"
---

# tooltip_hide_timeout

### Description

@short: Sets the length of time, in milliseconds, before the tooltip hides

@signature: tooltip_hide_timeout: number

### Example

~~~jsx
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~

### Details

:::note
This option is defined in the **tooltip** extension, so you need to activate the [tooltip](guides/extensions-list.md#tooltip) plugin. Read the details in the [Tooltips for Gantt Elements](guides/tooltips.md) article. 
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- [Tooltips for Gantt Elements](guides/tooltips.md)


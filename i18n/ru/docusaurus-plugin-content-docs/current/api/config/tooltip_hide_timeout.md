---
sidebar_label: tooltip_hide_timeout
title: tooltip_hide_timeout config
description: "устанавливает, как долго, в миллисекундах, тултип остаётся видимым перед тем, как исчезнуть"
---

# tooltip_hide_timeout

### Description

@short: Устанавливает, как долго, в миллисекундах, тултип остаётся видимым перед тем, как исчезнуть

@signature: tooltip_hide_timeout: number

### Example

~~~jsx
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~

### Details

:::note
 Эта опция является частью расширения **tooltip**, поэтому убедитесь, что плагин [tooltip](guides/extensions-list.md#tooltip) включён. Для получения дополнительной информации ознакомьтесь со статьёй [Тултипы для элементов Gantt](guides/tooltips.md). 
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- [Тултипы для элементов Gantt](guides/tooltips.md)


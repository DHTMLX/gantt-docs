---
sidebar_label: tooltip_hide_timeout
title: tooltip_hide_timeout конфигурация
description: "устанавливает длительность времени, в миллисекундах, до исчезновения tooltip"
---

# tooltip_hide_timeout

### Description

@short: Устанавливает длительность времени, в миллисекундах, до исчезновения tooltip

@signature: tooltip_hide_timeout: number

### Example

~~~jsx
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~

### Details

:::note
Эта настройка определяется в расширении **tooltip**, поэтому вам нужно активировать плагин [tooltip](guides/extensions-list.md#tooltip). Подробности см. в статье [Tooltips for Gantt Elements](guides/tooltips.md).
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- [Tooltips for Gantt Elements](guides/tooltips.md)